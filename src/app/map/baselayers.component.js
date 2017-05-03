"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var script_service_1 = require('../script.service');
var geo_service_1 = require('./geo.service');
var L = require('leaflet');
var BaselayersComponent = (function () {
    function BaselayersComponent(geo, script) {
        this.geo = geo;
        this.evtReady = new core_1.EventEmitter();
        // Open Street Map and Open Cycle Map definitions
        this.LAYER_OCM = {
            id: 'opencyclemap',
            name: 'Open Cycle Map',
            enabled: true,
            layer: L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: 'Open Cycle Map'
            })
        };
        this.LAYER_OSM = {
            id: 'openstreetmap',
            name: 'Open Street Map',
            enabled: false,
            layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: 'Open Street Map'
            })
        };
        // Form model object
        this.layersControlOptions = { position: 'bottomright' };
        this.baseLayers = {
            'Open Street Map': this.LAYER_OSM.layer,
            'Open Cycle Map': this.LAYER_OCM.layer
        };
        this.options = {
            zoom: 13
        };
        //script.load('realtime').then(this.onReady).catch(error => console.log(error));
    }
    BaselayersComponent.prototype.initMap = function (map) {
        var me = this;
        var markerOptions = {
            radius: 8,
            fillColor: "#ccccdd",
            color: "#000",
            weight: 1,
            opacity: 0.75,
            fillOpacity: 0.6
        };
        this.geo.getMapData(this.evtURL).then(function (geoJSONObject) {
            var layer = L.geoJSON(geoJSONObject, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, markerOptions);
                },
                style: function (feature) {
                    if (feature['properties']['active']) {
                        return { opacity: 1, fillOpacity: 0.9, fillColor: "#ccccff", color: "#005" };
                    }
                },
                onEachFeature: function (feature, layer) {
                    // does this feature have a property named popupContent?
                    if (feature.properties && feature['properties']['description']) {
                        layer.bindPopup(feature['properties']['description']);
                    }
                }
            });
            var length = geoJSONObject['features'].length;
            layer.addTo(map);
            var mean = function (p1, p2) { return [p1[0] + p2[0], p1[1] + p2[1]]; };
            var center = geoJSONObject['features'].map(function (feature) { return feature['geometry']['coordinates'].reverse(); })
                .reduce(mean).map(function (x) { return x / length; });
            map.setView(L.latLng(center), undefined, { reset: true });
            me.evtReady.emit(layer);
        });
    };
    ;
    __decorate([
        core_1.Output('eventsReady')
    ], BaselayersComponent.prototype, "evtReady");
    __decorate([
        core_1.Input('eventsURL')
    ], BaselayersComponent.prototype, "evtURL");
    BaselayersComponent = __decorate([
        core_1.Component({
            selector: 'base-layers-component',
            templateUrl: './baselayers.component.html',
            providers: [geo_service_1.GeoService, script_service_1.Script]
        })
    ], BaselayersComponent);
    return BaselayersComponent;
}());
exports.BaselayersComponent = BaselayersComponent;
//# sourceMappingURL=baselayers.component.js.map