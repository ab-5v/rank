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
     *
     */
    formula: function(name) {
    },

    /**
     * @private
     */
    init: function() {}
};


module.exports = factorial;
