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
