var vars = require('./vars');
var util = require('./util');
var types = vars.FACTORTYPE;

/**
 * Creates new formula instance
 *
 * @constructor
 * @param {String} name
 * @param {Array} factors
 */
var Formula = function(factors) {
    this.factors = factors;
};

Formula.prototype = {

    /**
     * Runs formula logic
     *
     * @param {Array} data
     * @param {Object} conditions
     * @return Array of sorted data
     */
    run: function(data, conditions) {
        var that = this;
        var promise = util.promise();

        util.promise
            .when( this.exec(data, conditions) )
            .then( function (ranks) {

                var summary = that.merge(ranks);
                var result = that.compile(data, summary);

                promise.resolve(result);
            });

        return promise;
    },

    /**
     * Executes each factor one by one
     *
     * @private
     * @param {Array} data
     * @param {Object} conditions
     * @return Array of arrays with distribution from each factor
     */
    exec: function(data, conditions) {

        return this.factors.map(function(factor) {
            return factor.exec(data, conditions);
        });
    },

    /**
     * Merges distributions from all factors
     *
     * @private
     *
     * @param {Array} ranks
     * @return Array of summary distribution
     */
    merge: function(ranks) {
        var summary = [];

        ranks.forEach(function(dist) {
            dist.forEach(function(val, i) {
                if (val === -1 || summary[i] === -1) {
                    summary[i] = -1;
                } else {
                    summary[i] = (summary[i] || 0) + val;
                }
            });
        });

        return summary;
    },

    /**
     * Applies summary distribution to original data
     *
     * @private
     * @param {Array} data
     * @param {Array} summary
     * @return Array with sorted and filtered data
     */
    compile: function(data, summary) {

        return summary
            // save indexes
            .map(function(item, i) { return {i: i, v: item}; })
            // ignore filtered items
            .filter(function(item) { return item.v >= 0; })
            // sort items
            .sort(function(a, b) { return b.v - a.v; })
            // return data items in the right order
            .map(function(item) { return data[item.i]; });

    }
};

module.exports = Formula;
