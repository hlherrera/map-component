import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {geo_data} from './geodata';

import {LeafletModule} from '@asymmetrik/angular2-leaflet/dist';
import {BaselayersComponent} from './baselayers.component';

import {GeoService} from './geo.service';

@NgModule({
    declarations: [
        BaselayersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LeafletModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(geo_data, { delay: 600 })
    ],
    providers: [GeoService],
    exports: [
        BaselayersComponent
    ]
})
export class MapModule {
}
