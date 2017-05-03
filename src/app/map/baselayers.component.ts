import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Script} from '../script.service';
import {GeoService} from './geo.service';
import {LayersModel} from './layers.model';

import * as L from 'leaflet';

@Component({
    selector: 'base-layers-component',
    templateUrl: './baselayers.component.html',
    providers: [GeoService, Script]
})

export class BaselayersComponent {

    @Output('eventsReady') evtReady = new EventEmitter<L.GeoJSON>();
    @Input('eventsURL') evtURL: string;
    // Open Street Map and Open Cycle Map definitions
    LAYER_OCM = {
        id: 'opencyclemap',
        name: 'Open Cycle Map',
        enabled: true,
        layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Open Cycle Map'
        })
    };
    LAYER_OSM = {
        id: 'openstreetmap',
        name: 'Open Street Map',
        enabled: false,
        layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Open Street Map'
        })
    };

    // Form model object
    layersControlOptions = { position: 'bottomright' };
    baseLayers = {
        'Open Street Map': this.LAYER_OSM.layer,
        'Open Cycle Map': this.LAYER_OCM.layer
    };

    options = {
        zoom: 13
    };

    constructor(private geo:GeoService, script:Script) {
        //script.load('realtime').then(this.onReady).catch(error => console.log(error));
    }

    initMap(map:L.Map) {
        let me = this;
        let markerOptions = {
            radius: 8,
            fillColor: "#ccccdd",
            color: "#000",
            weight: 1,
            opacity: 0.75,
            fillOpacity: 0.6
        };

        this.geo.getMapData(this.evtURL).then((geoJSONObject) => {
            let layer = L.geoJSON(geoJSONObject, {
                pointToLayer: (feature, latlng) => {
                    return L.circleMarker(latlng, markerOptions);
                },
                style: function (feature) {
                    if (feature['properties']['active']) {
                        return {opacity: 1, fillOpacity: 0.9, fillColor: "#ccccff", color: "#005"};
                    }
                },
                onEachFeature: (feature, layer) => {
                    // does this feature have a property named popupContent?
                    if (feature.properties && feature['properties']['description']) {
                        layer.bindPopup(feature['properties']['description']);
                    }
                }
            });

            const length = geoJSONObject['features'].length;
            layer.addTo(map);
            let mean = ( p1, p2 ) => [p1[0] + p2[0], p1[1] + p2[1]];
            let center = geoJSONObject['features'].map(feature => feature['geometry']['coordinates'].reverse())
                .reduce(mean).map(x => x/length);
            map.setView(L.latLng(center), undefined, {reset: true} as any);
            me.evtReady.emit(layer);
        });

    };
}
