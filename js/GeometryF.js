const GeometryF = {

    //function: normalizes a vector
    //parameters: x and y of vector to be normalized
    //return: a vector with magnitude 1
    vectorNormalize: function (x, y) {
        const length = Math.hypot(x, y);

        if (length === 0) return { x: 0, y: 0 };

        return {
            x: x / length,
            y: y / length
        };
    },

    //function: gets the difference between two points
    //parameters: (x1, y1) first pt. (x2, y2) second pt.
    //return: the (x, y) difference
    vectorDifference: function (x1, y1, x2, y2) {
        return{
            x: x2 - x1,
            y: y2 - y1
        }
    },

    //function: gets the orthogonal vector
    //parameters: (x, y) vector
    //return: (x, y) orthogonal vector
    vectorOrthogonal: function (x, y){
        return{
            x: -y,
            y: x
        }
    },

    //function: gets the length of a vector using pythagorean theorem
    //parameters: (x, y) vector
    //return: a float of the length
    vectorLength: function (x, y){
        return Math.sqrt(x * x + y * y);
    },

    /////////////////////////// Color /////////////////////////////
    cosmic: function (t) {
    const hue = (300 + 60 * Math.sin(t * 1.5)) % 360;
    const light = 40 + 20 * Math.sin(t * 2);
    return `hsl(${hue}, 100%, ${light}%)`;
    }
}