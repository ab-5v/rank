var factor = require('./factor');
var formula = require('./formula');

var rAnk, rAnk_proto;

/**
 * rAnk public API
 *
 * @class rAnk
 */
rAnk = function() {
    return new rAnk_proto._init();
};

rAnk_proto = rAnk.prototype = {

    /**
     * rAnk initialisation
     *
     * @private
     */
    _init: function() {
        // default values
        this._data = [];
        this._descriptions = [];
        this._weights = [];
        this._conditions = {};
    },

    /**
     * Accumulates factors for current formula
     *
     * @param {Array} descriptions
     *
     * @return rAnk
     */
    factors: function(descriptions) {
        var that = this;

        if ( !Array.isArray(descriptions) ) {
            descriptions = [descriptions];
        }

        descriptions.forEach(function(desc) {
            that._descriptions.push( desc );
        });

        return this;
    },

    /**
     * Save weights for current formula
     *
     * @param {Array} weights
     *
     * @return rAnk
     */
    weights: function(weights) {
        this._weights = weights;

        return this;
    },


    /**
     * Saves conditions for current formula
     *
     * @param {Object} conditions
     *
     * @return rAnk
     */
    conditions: function(conditions) {
        this._conditions = conditions;

        return this;
    },

    /**
     * Saves data for current formula
     *
     * @param {Array} data
     *
     * @return rAnk
     */
    data: function(data) {
        this._data = data;

        return this;
    },

    /**
     * Loads data from the run result
     *
     * @param result
     */
    load: function(result) {
        var that = this;
        var marks = [];
        var descriptions = [];
        var ids = result.factor || [];

        this._weights = result.weight;

        this._data = result.data || result.stat.map(function(a, i) { return i; });

        result.stat[0].forEach(function(w, i) {
            marks[i] = [];

            result.stat.forEach(function(stat) {
                marks[i].push(stat[i]);
            });
        });

        marks.forEach(function(mark, i) {
            that.factors({id: ids[i], valueAll: function() { return mark; }});
        });

        return this;
    },

    /**
     * Executes formula with given factors and params
     *
     * @param {Function} callback
     *
     * @return Object
     */
    run: function() {

        // creating factors from description
        var factors = this._descriptions
            .map(function(desc) { return factor(desc); });

        // creating and runnig formula
        return formula(factors, this._weights)
            .run(this._data, this._conditions);
    }
};
rAnk_proto._init.prototype = rAnk_proto;

module.exports = rAnk;
