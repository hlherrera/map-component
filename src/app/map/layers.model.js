"use strict";
var LayersModel = (function () {
    function LayersModel(baseLayers, baseLayer, overlayLayers) {
        if (overlayLayers === void 0) { overlayLayers = []; }
        this.baseLayers = baseLayers;
        this.baseLayer = baseLayer;
        this.overlayLayers = overlayLayers;
    }
    return LayersModel;
}());
exports.LayersModel = LayersModel;
//# sourceMappingURL=layers.model.js.map