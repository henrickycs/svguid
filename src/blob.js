
function createBlob(key) {

    const blob = {
        width: 500,
        height: 500,

        getAngles(key = 1) {
            if (key == 0) key = 1
            let angles = [0, 90, 180, 270]
            for (let i = 1; i <= 4; i++) {
                let a = ((key << i) - key) % 45
                angles[i - 1] = angles[i - 1] + a;
            }
            return angles
        },

        getCirclePoints(base, radius, key) {
            let angles = blob.getAngles(key)
            //console.log(`angles ${key}`, angles);
            const positions = [];
            for (let a in angles) {
                const angle = (angles[a] * Math.PI) / 180;
                let ba = ((angles[a] - 20) * Math.PI) / 180;
                //console.log("ba", ba);
                let amount = 60 + (angles[a] % 30)
                if (angles[a] % 2 == 1) {
                    amount = amount * -1
                }
                let rr = radius + amount //blob.getRandomArbitrary(40, 100);
                let position = {
                    x: base.x + radius * Math.sin(angle),
                    y: base.y + radius * Math.cos(angle),
                    mx: base.x + rr * Math.sin(ba),
                    my: base.y + rr * Math.cos(ba)
                }
                positions.push(position);
                //console.log("position", position);
            }
            positions.push(positions[0]);
            return positions;
        },

        drawPath(points) {
            let cpath = `M${points[0].x},${points[1].y}`;
            for (let point of points)
                cpath += `S${point.mx},${point.my},${point.x},${point.y}`;
            cpath += "Z";
            return cpath
        },

        getPath(key) {
            let points = blob.getCirclePoints({ x: 250, y: 250 }, 220, key);
            //console.log(points);
            blob.path = blob.drawPath(points)
            return { points, path: blob.path }
        },

        drawBlob(draw, x, y, w, h, fill='black') {
            let scaleX = w / blob.width
            let scaleY = h / blob.height
        
            let group = draw.group().transform({ 
                scaleX, scaleY, translate: {x, y} 
            }).attr({ fill })
            group.path(blob.path)
            return group
        }
    }

    blob.getPath(key)

    return blob
}

const svgjsblob = {
    // Create a rounded element
    blob: function (key, attrs) {
        let blob = createBlob(key)
        console.log("attrs",attrs);
        return blob.drawBlob(this, attrs.x, attrs.y, attrs.width, attrs.height, attrs.fill)
        //return this 
        //.put(new SVG.Path).attr({ d: blob.path } )
    }
}

export default svgjsblob