var vars = require('./vars');
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

        var ranks = this.exec(data, conditions);
        var summary = this.merge(ranks);

        return this.compile(data, summary);
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
            // ignore filtered items
            .filter(function(item) { return item >= 0; })
            // sort items
            .sort(function(a, b) { return b - a; })
            // return data items in the right order
            .map(function(item) { return data[summary.indexOf(item)]; });

    }
};

module.exports = Formula;
