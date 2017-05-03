import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GeoService {

    constructor(private http:Http) {
    }

    getMapData(data_URL) {
        return this.http
            .get(data_URL)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    getGeoJSONEvent(map, L) {
        const map_URL = 'https://server.com/upload/events';
        const ws = new EventSource(map_URL, {withCredentials: true});
        ws.addEventListener('geojson', (evt) => {
            const data = JSON.parse(evt.data);
            const markerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            map.eachLayer((layer) => {
                if (!layer._tiles) {
                    layer.remove();
                }
            });

            L.geoJSON(data, {
                pointToLayer: (feature, latlng) => {
                    return L.circleMarker(latlng, markerOptions);
                },
                onEachFeature: (feature, layer) => {
                    // does this feature have a property named popupContent?
                    if (feature.properties && feature['properties']['mmsi']) {
                        layer.bindPopup('The feature id: ' + feature.properties.mmsi);
                    }
                }

            }).addTo(map);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
