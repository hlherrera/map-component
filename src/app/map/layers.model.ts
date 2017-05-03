/**
 * Created by hermes on 02/05/2017.
 */
import * as L from 'leaflet';

export class LayersModel {

    constructor(
        public baseLayers: {
            id: string,
            name: string,
            enabled: boolean,
            layer: L.Layer
        }[],
        public baseLayer: string,
        public overlayLayers: {
            id: string,
            name: string,
            enabled: boolean,
            layer: L.Layer
        }[] = []
    ) { }

}