var util = require('./util');

/**
 * Creates new formula instance
 *
 * @constructor
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
     * @param {Array} weights
     *
     * @return Array of sorted data
     */
    run: function(data, conditions, weights) {
        var that = this;
        var promise = util.promise();

        // default weight is 1;
        weights = this.weight(weights);

        util.promise
            .when( this.exec(data, conditions) )
            .then( function (sortings) {

                var limits = that.limits(sortings);
                var ranks = that.distributions(limits, data, sortings);
                var stat = that.stat(ranks);
                var summary = that.merge(ranks, weights);
                var result = that.compile(data, summary, stat);

                // save weights in result
                result.weight = weights;

                promise.resolve(result);
            });

        return promise;
    },

    /**
     * Calculates weight with default of 1
     *
     * @param {Array} weights
     *
     * @return Array
     */
    weight: function(weights) {
        weights = weights || [];

        return this.factors.map(function(factor, i) {
            return weights[i] || 1;
        });
    },

    /**
     * Computes distribution for each of factor
     *
     * @param {Object} limits
     * @param {Array} data
     * @param {Array} sortings
     *
     * @return Array
     */
    distributions: function(limits, data, sortings) {
        var factors = this.factors;

        return sortings.map(function(sorting, i) {
            return factors[i].distribution(limits, data, sorting);
        });
    },

    /**
     * Computes min and max values of factor's marks
     *
     * @param {Array} sortings
     *
     * @return Object
     */
    limits: function(sortings) {
        var limits = { min: 1, max: null };
        var factors = this.factors;
        var cardinals = [];

        sortings.forEach(function(sorting, i) {
            var ftype = factors[i].type;

            if (ftype === F_BINARY && !limits.max) {
                limits.max = limits.min;
            } else if (ftype === F_MINMAX || ftype === F_MAXMIN) {
                cardinals.push( util.math.cardinal(sorting) );
            }
        });

        if (cardinals.length) {
            limits.max = Math.ceil( util.math.median( cardinals ) );

            // in case of low cardinality
            if (limits.max === limits.min) {
                limits.max++
            }
        }

        return limits;
    },

    /**
     * Save statistic for each item in the set like:
     * @example
     *  item1: [f1 makr, f2 mark, f3 mark, ...]
     *
     * @param {Array} ranks
     * @return Array of rank makrs for each item
     */
    stat: function(ranks) {
        var stat = [];
        var length = ranks[0].length;

        for (var i = 0; i < length; i++) {
            stat[i] = ranks.map(function(rank) { return rank[i]; });
        }

        return stat;
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
    merge: function(ranks, weights) {
        var summary = [];

        ranks.forEach(function(dist, j) {
            dist.forEach(function(val, i) {
                if (val === -1 || summary[i] === -1) {
                    summary[i] = -1;
                } else {
                    summary[i] = (summary[i] || 0) + val * weights[j];
                }
            });
        });

        return summary;
    },

    /**
     * Applies summary distribution to original data
     * (sorts original data in order of merged ranks)
     *
     * @private
     * @param {Array} data
     * @param {Array} summary
     * @return Array with sorted and filtered data
     */
    compile: function(data, summary, stats) {

        var sorted = summary
            // save indexes
            .map(function(item, i) { return {i: i, v: item}; })
            // ignore filtered items
            .filter(function(item) { return item.v >= 0; })
            // sort items
            .sort(function(a, b) { return b.v - a.v; });

        // return stat items in right order
        var stat = sorted.map(function(item) { return stats[item.i]; })
        // return data items in the right order
        var result = sorted.map(function(item) { return data[item.i]; });

        return {
            result: result,
            stat: stat
        };
    }
};

module.exports = Formula;
