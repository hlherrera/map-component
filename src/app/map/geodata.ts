/**
 * Created by hermes on 01/05/2017.
 */
export class geo_data {
    createDb() {
        const length = 11;
        const dateDiff = 1000000;
        let x = 48.517;
        let y = 18.255;
        let initDate = new Date().getTime() - length * dateDiff;
        let geo = {
            "type": "FeatureCollection",
            "features": []
        };
        for (let i = 0; i < length; i++) {
            let rand_x = 1.6*Math.random();
            let rand_y = 1.6*Math.random();
            let dist = rand_x + rand_y;
            x = x + rand_x ; 
            y = y + rand_y ;
            let date = new Date();
            date.setTime(initDate + i * dateDiff*0.3 + dist*dateDiff*0.7);
            let id = "id-" + i;
            let description = ['<h3><strong>DateTime:</strong>%date%</h3>', '<div>Simple body description here...</div>',
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
            })
        }

        return {geo};
    }
}
