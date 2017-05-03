"use strict";
/**
 * Created by hermes on 01/05/2017.
 */
var geo_data = (function () {
    function geo_data() {
    }
    geo_data.prototype.createDb = function () {
        var length = 11;
        var dateDiff = 1000000;
        var x = 48.517;
        var y = 18.255;
        var initDate = new Date().getTime() - length * dateDiff;
        var geo = {
            "type": "FeatureCollection",
            "features": []
        };
        for (var i = 0; i < length; i++) {
            var rand_x = Math.random();
            var rand_y = Math.random();
            var dist = rand_x + rand_y;
            x = x + rand_x / 100.0;
            y = y + rand_y / 100.0;
            var date = new Date();
            date.setTime(initDate + i * dateDiff * 0.3 + dist * dateDiff * 0.7);
            var id = "id-" + i;
            var description = ['<h3><strong>DateTime:</strong>%date%</h3>', '<div>Simple body description here...</div>',
                "<div><a href='#%id%'>more...</a></div>"].join('')
                .replace('%date%', date.toLocaleString()).replace('%id%', id);
            geo['features'].push({
                "geometry": {
                    "coordinates": [x, y],
                    "type": "Point"
                },
                "type": "Feature",
                "properties": {
                    "geometry/type": "Point",
                    "id": id,
                    "description": description,
                    "active": (i === length - 1),
                    "type": "Event"
                }
            });
        }
        return { geo: geo };
    };
    return geo_data;
}());
exports.geo_data = geo_data;
//# sourceMappingURL=geodata.js.map