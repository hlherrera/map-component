"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var angular_in_memory_web_api_1 = require('angular-in-memory-web-api');
var geodata_1 = require('./geodata');
var dist_1 = require('@asymmetrik/angular2-leaflet/dist');
var baselayers_component_1 = require('./baselayers.component');
var geo_service_1 = require('./geo.service');
var MapModule = (function () {
    function MapModule() {
    }
    MapModule = __decorate([
        core_1.NgModule({
            declarations: [
                baselayers_component_1.BaselayersComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                dist_1.LeafletModule,
                http_1.HttpModule,
                angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(geodata_1.geo_data, { delay: 600 })
            ],
            providers: [geo_service_1.GeoService],
            exports: [
                baselayers_component_1.BaselayersComponent
            ]
        })
    ], MapModule);
    return MapModule;
}());
exports.MapModule = MapModule;
//# sourceMappingURL=map.module.js.map