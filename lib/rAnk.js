var Factor = require('./factor');
var Formula = require('./formula');

var rAnk = {

    /**
     * @private
     * @type Object
     */
    _config: {},

    /**
     *
     * @param {String|Object} name
     * @param {String} val
     */
    config: function(name, val) {
        if (typeof name === 'object') {
            for (var key in name) {
                this._config[key] = name[key]
            }
        } else if (typeof name === 'string') {
            if (arguments.length === 2) {
                this._config[name] = val;
            } else {
                return this._config[name];
            }
        }
    },

    /**
     * @private
     */
    _formula: {},

    /**
     *
     */
    formula: function(name, factors) {

        if (arguments.length > 1) {
            this._formula[name] = new Formula( this.factor(factors) );
        }

        return this._formula[name];
    },

    /**
     * @private
     */
    _factor: {},

    /**
     * Returns given factor
     * @param {Object|Array|String}
     */
    factor: function(factor) {
        var args = [].concat(arguments);
        var results = [];

        while(current = args.shift()) {

            if (typeof current === 'object') {
                // already Factor
                if (current instanceof Factor) {
                    this._factor[factor.name] = current;
                    results.push(current);
                // some Array
                } else if (Array.isArray(current)) {
                    current.forEach(this.factor.bind(this));
                // factor description
                } else {
                    this.factor( new Factor(current) );
                }
            } else if (typeof current === 'string') {
                // check if it is the name of factor
                if (this._factor[current]) {
                    results.push(this._factor[current]);
                // trying to load external file
                } else {
                    try { this.factor( require(current) ) } catch(e) {}
                }
            }
        }

        return results.length > 1 ? results : results[0];
    },

    /**
     *
     * @param {String} name of formula
     * @param {Array} data
     * @param {Object} conditions
     */
    run: function(name, data, conditions) {
        this.formula(name).exec(data, conditions);
    },

    /**
     * @private
     */
    init: function() {}
};


module.exports = rAnk;
