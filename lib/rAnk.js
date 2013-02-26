var factor = require('./factor');
var formula = require('./formula');

var rAnk, proto;

/**
 * rAnk public API
 *
 * @class rAnk
 */
rAnk = module.exports = function() {
    return new proto._init();
};

proto = rAnk.prototype = {

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
     * Executes formula with given factors and params
     *
     * @param {Function} callback
     *
     * @return p0
     */
    run: function(callback) {
        // creating factors from description
        var factors = this._descriptions.map(function(desc) { return factor(desc); });
        // creating and runnig formula
        var promise = formula(factors, this._weights).run(this._data, this._conditions);

        if (callback) {
            promise.then(callback);
        } else {
            return promise;
        }
    }
};
proto._init.prototype = proto;
