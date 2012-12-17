var factorial = {

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
    formula: function(name, factorNames) {
        var that = this;
        var factors = factorNames
            .map(function(name) { return that.factor(name); })
            .filter(function(factor) { return factor !== undefined });

        this._formula[name] = new Formula(name, factors);

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


module.exports = factorial;
