var pzero = require('p0');

var formula, proto;

/**
 * @class formula
 *
 * @param {Array} factors
 * @param {Array} weights
 */
formula = module.exports = function(factors, weights) {
    return new proto._create(factors, weights);
};

proto = formula.prototype = {

    /**
     * @constructor
     *
     * @private
     * @param {Array} factors
     * @param {Array} weights
     */
    _create: function(factors, weights) {
        var that = this;

        // all factors
        this._factors = factors;
        // factors, that has only `value` method
        this._simples = factors.filter(function(f) { return !f.isAll; });

        // calculating default values to weights
        this._weights = this.weight(weights);
    },

    /**
     * Assigns weights to factors
     *
     * @private
     * @param {Array} weights
     *
     * @returns {Array}
     */
    weight: function(weights) {
        weights = weights || [];

        return this._factors.map(function(factor, i) {
            return weights[i] || 1;
        });
    },

    /**
     * Executes all factors to get their values
     *
     * @private
     * @param {Array} data
     * @param {Object} cond
     *
     * @returns {Array}
     */
    exec: function(data, cond) {

        return this._factors.map(function(factor) {
            return factor.exec(data, cond);
        });
    },

    /**
     * Merges and compiles factor's values
     *
     * @private
     * @param {Array} results
     *
     * @returns {Object}
     */
    compile: function(results) {
        var stat = [];
        var result = [];
        var summary = [];

        var data = this._data;
        var weight = this._weights;

        results[0].forEach(function(a, i) {

            var all = results.map(function(vals) { return vals[i]; });
            var sum = all.reduce(function(a, b, f) {
                return a === -1 || b === -1 ? -1 : a + b * weight[f];
            }, 0);

            if (sum > 0) { summary.push([sum, data[i], all]); }

        });

        summary
            .sort(function(a, b) { return a[0] - b[0]; })
            .forEach(function(item) {
                result.push( item[1] );
                stat.push( item[2] );
            });

        return {
            stat: stat,
            result: result,
            weight: weight
        };
    },

    /**
     * Executes formula
     *
     * @protected
     * @param {Array} data
     * @param {Object} conditions
     */
    run: function(data, cond) {
        this._data = data;

        var simples = this._simples;

        // executes one-factors and fills their `_values`
        data.forEach(function(item, i) {
            simples.forEach(function(factor) { factor.append(i, item, cond); });
        });

        // executes and compile all factors
        return pzero.when( this.exec(data, cond) ).then( this.compile.bind(this) );
    }
};

proto._create.prototype = proto;
