var CONST = require('./const');

var formula, formula_proto;

/**
 * @class formula
 *
 * @param {Array} factors
 * @param {Array} weights
 */
formula = function(factors, weights) {
    return new formula_proto._create(factors, weights);
};

formula_proto = formula.prototype = {

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
     * Merges and compiles factor's marks
     *
     * @private
     * @param {Array} factors
     *
     * @returns {Object}
     */
    compile: function(results) {
        var DEL = CONST.VALUE_DEL;
        var NTR = CONST.VALUE_NTR;
        var sum = [];
        var stats = [];
        var resData = [];
        var resStat = [];
        var summary = [];

        var data = this._data;
        var weights = this._weights;

        var ids = this._factors.map(function(f) { return f.id; });

        results.forEach(function(marks, iFactor) {
            marks.forEach(function(mark, iMark) {
                // create stats slot
                if (!stats[iMark]) { stats[iMark] = []; }
                // ignore deleted values
                if (mark === DEL || sum[iMark] === DEL) {
                    sum[iMark] = DEL;
                // do ignore NTR values
                } else if (mark === NTR) {
                    stats[iMark][iFactor] = 0;
                } else {
                    // summing marks
                    sum[iMark] = (sum[iMark] || 0) + mark * weights[iFactor];
                    // saving stats
                    stats[iMark][iFactor] = mark;
                }
            });
        });

        sum.forEach(function(val, i) {
            if (val !== DEL) {
                summary.push([val, data[i], stats[i]]);
            }
        });

        summary
            .sort(function(a, b) { return b[0] - a[0]; })
            .forEach(function(item) {
                resData.push(item[1]);
                resStat.push(item[2]);
            });


        return {
            stat: resStat,
            data: resData,
            factor: ids,
            weight: weights
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
        return this.compile( this.exec(data, cond) );
    }
};

formula_proto._create.prototype = formula_proto;

module.exports = formula;
