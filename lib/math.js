var math = module.exports = {

    /**
     * Returns linear function for the given points
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     *
     * @return Function
     */
    linear: function(x1, y1, x2, y2) {

        // increasing or decreasing function
        return (x2 - x1 > 0) === (y2 - y1 > 0) ?
            function linear(x) { return y1 + (x - x1) * (y2 - y1) / (x2 - x1); } :
            function linear(x) { return y2 + (x2 - x) * (y1 - y2) / (x2 - x1); };
    },

    /**
     * Returns min value in array
     *
     * @param {Array} values
     *
     * @return Number
     */
    min: function(values) {
        return Math.min.apply(null, values);
    },

    /**
     * Returns max value in array
     *
     * @param {Array} values
     *
     * @return Number
     */
    max: function(values) {
        return Math.max.apply(null, values);
    },

    /**
     * Returns sum of values in array
     *
     * @param {Array} values
     *
     * @return Number
     */
    sum: function(values) {
        return values.reduce(function(a, b) { return a + b}, 0);
    }

};
