"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var GeoService = (function () {
    function GeoService(http) {
        this.http = http;
    }
    GeoService.prototype.getMapData = function (data_URL) {
        return this.http
            .get(data_URL)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    GeoService.prototype.getGeoJSONEvent = function (map, L) {
        var map_URL = 'https://server.com/upload/events';
        var ws = new EventSource(map_URL, { withCredentials: true });
        ws.addEventListener('geojson', function (evt) {
            var data = JSON.parse(evt.data);
            var markerOptions = {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            map.eachLayer(function (layer) {
                if (!layer._tiles) {
                    layer.remove();
                }
            });
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, markerOptions);
                },
                onEachFeature: function (feature, layer) {
                    // does this feature have a property named popupContent?
                    if (feature.properties && feature['properties']['mmsi']) {
                        layer.bindPopup('The feature id: ' + feature.properties.mmsi);
                    }
                }
            }).addTo(map);
        });
    };
    GeoService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    GeoService = __decorate([
        core_1.Injectable()
    ], GeoService);
    return GeoService;
}());
exports.GeoService = GeoService;
//# sourceMappingURL=geo.service.js.map