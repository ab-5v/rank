var math = {

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
        return values.reduce(function(a, b) { return a + b; }, 0);
    },

    /**
     * Returns arithmetic mean for the array of values
     *
     * @param {Array} values
     *
     * @return Number
     */
    mean: function(values) {
        return values.length ? math.sum(values) / values.length : 0;
    },

    /**
     * Returns mode of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    mode: function(values) {
        var maxVal = values[0];
        var maxFreq = -Infinity;
        var counts = {};

        values.forEach(function(val) {
            var freq = counts[val] = (counts[val] || 0) + 1;
            if (freq > maxFreq) {
                maxVal = val;
                maxFreq = freq;
            }
        });

        return maxVal;
    },


    /**
     * Retruns median of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    median: function(values) {
        if (!values.length) {
            return 0;
        }

        var sorted = values.slice().sort(function(a, b) { return a - b; });
        var middle = Math.ceil(values.length / 2) - 1;

        return sorted.length % 2 ?
            sorted[ middle ] : math.mean([sorted[ middle ], sorted[ middle + 1 ]]);
    },

    /**
     * Returns cardinality of the array (number of uniq elements)
     *
     * @param {Array} values
     *
     * @return Number
     */
    cardinal: function(values) {
        var card = 0;
        var uniqs = {};

        values.forEach(function(val) {
            if ( !(val in uniqs) ) {
                uniqs[val] = true;
                card++;
            }
        });

        return card;
    },

    /**
     * Returns variance of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    variance: function(values) {
        var m = math.mean(values);
        var pow = Math.pow;

        return math.mean( values.map(function(val) { return pow(m - val, 2); }) );
    },

    /**
     * Returns standart deviation of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    deviation: function(values) {
        return Math.sqrt( math.variance(values) );
    },

    /**
     * Returns mean difference beetwin elements in array
     *
     * @param {Array} values
     *
     * @return {Number}
     */
    step: function(values) {
        if (values.length < 2) {
            return 0;
        }

        var last;
        var abs = Math.abs;

        return values
            .sort(function(a, b) { return a - b; } )
            .reduce(function(a, b, i) {
                var diff = last === undefined ? abs(a - b) : abs(last - b);
                last = b;
                return (i > 1 ? a : 0) + diff;
            }) / (values.length - 1);
    }

};

module.exports = math;
