var crypto = require('crypto');

var math = require('./math');
var CONST = require('./const');

var factor, factor_proto;

/**
 * @class factor
 */
factor = function(description) {
    return new factor_proto._create(description);
};

factor_proto = factor.prototype = {

    /**
     * Creates factor instance
     *
     * @private
     * @constructor
     * @param {Object} descr
     */
    _create: function(descr) {
        if (!descr || !('value' in descr || 'valueAll' in descr)) {
            throw Error('You should define value or valueAll for your factor');
        }

        this._values = [];

        this.isAll = 'valueAll' in descr;

        // generate id if user does'n provide one
        if (!descr.id || typeof descr.id !== 'string') {
            delete descr.id;
            this.id = factor.generateId(descr);
        }

        // extend factor's properties with description
        for (var key in descr) {
            this[key] = descr[key];
        }
    },

    /**
     * Index of item currently processed with `value`
     *
     * @private
     * @type Number
     */
    _index: 0,

    /**
     * Marks i'th item as a neutral value,
     * that means after normalizations this value would be 0
     *
     * @public
     * @param {Number} i
     */
    neutralValue: function(i) {
        this.replacement(i || this._index, CONST.REPLACER_NTR);
    },

    /**
     * Marks i'th item to be removed
     *
     * @public
     * @param {Number}
     */
    removeItem: function(i) {
        this.replacement(i || this._index, CONST.REPLACER_DEL);
    },

    /**
     * Initializes and adds replacement
     *
     * @private
     * @param {Number} i
     * @param {Number} value
     */
    replacement: function(i, value) {
        if (!this._replacements) {
            this._replacements = {};
        }

        this._replacements[i] = value;
    },

    /**
     * Object with min/max and del replacements
     *
     * @private
     * @type Object
     */
    _replacements: null,

    /**
     * Calculates limits and processes replacements
     *
     * @private
     * @param {Array} values
     *
     * @returns Object
     */
    preprocess: function(values) {
        var spur = {}, fine = {};
        var mins = [], maxs = [];
        var repl = this._replacements;

        for (var i = 0; i < values.length; i++) {
            var val = values[i];

            // replacesers
            if (repl && i in repl) {
                switch( repl[i] ) {
                    case CONST.REPLACER_NTR: values[i] = CONST.VALUE_NTR; break;
                    case CONST.REPLACER_DEL: values[i] = CONST.VALUE_DEL; break;
                }
            // fines and spurs
            } else if (typeof val === 'number') {
                if (val < 0) {
                    if ( !('min' in fine) || fine.min < val) { fine.min = val; }
                    if ( !('max' in fine) || fine.max > val) { fine.max = val; }
                } else {
                    if ( !('min' in spur) || spur.min > val) { spur.min = val; }
                    if ( !('max' in spur) || spur.max < val) { spur.max = val; }
                }
            // neutral values by default
            } else {
                values[i] = CONST.VALUE_NTR;
            }
        }

        return { spur: spur, fine: fine };
    },

    /**
     * Maps returned values to normolized values
     *
     * @private
     * @param {Array} replaced
     * @param {Object} limits
     *
     * @return Array
     */
    normalize: function(values, limits) {

        // returns right linear function
        var linear = function(type, limits, invert) {
            var MIN = CONST[type + '_MIN'];
            var MAX = CONST[type + '_MAX'];

            return limits.min === limits.max ?
                function() { return MAX; }:
                !invert ?
                    math.linear( limits.min, MIN, limits.max, MAX ):
                    math.linear( limits.min, MAX, limits.max, MIN );
        };

        // chose right linear function
        var fine = linear('FINE', limits.fine, false);
        var spur = linear('SPUR', limits.spur, this.invert);

        for (var i = 0; i < values.length; i++) {
            var val = values[i];

            if (typeof val === 'number') {
                values[i] = val < 0 ? fine(val) : spur(val);
            }
        }

        return values;
    },

    /**
     * Prepares values, that retruns factor and resolves promise
     * with resulting marks
     *
     * @private
     * @param {Array} values
     */
    done: function(values) {
        // calculate min and max values
        var limits = this.preprocess(values);
        // normolizing values
        return this.normalize(values, limits);
    },

    /**
     * Executes factor and prepares it's final marks
     *
     * @protected
     * @param {Array} data
     * @param {Object} cond
     *
     * @type Array
     */
    exec: function(data, cond) {
        var values = this.isAll ?
            this.valueAll(data, cond) : this._values;

        return this.done(values);
    },

    /**
     * Calculates value for item and adds one to the resulting `_values` array
     *
     * @protected
     * @param {Object} item
     * @param {Object} cond
     */
    append: function(i, item, cond) {
        this._index = i;
        this._values[i] = this.value(item, cond);
    },

    /**
     * Math helpers
     *
     * @type Object
     */
    math: math,

    /**
     * Calculates value for current item
     *
     * @public
     * @param {Object} item
     * @param {Object} conditions
     *
     * @return Number
     */
    value: function(item, conditions) {
        throw Error('Method value must be overwritten');
    },

    /**
     * Calculates values for items from dataset
     *
     * @public
     * @param {Array} data
     * @param {Object} conditions
     * @param {Function} done
     */
    valueAll: function() {
        throw Error('Method valueAll must be overwritten');
    }
};

/**
 * Generates md5 hash for description
 */
factor.generateId = function(descr) {
    var res = [];

    for (var key in descr) {
        res.push( key + ':' + descr[key].toString() );
    }

    return crypto.createHash('md5').update( res.join(',') ).digest('hex');
};

factor_proto._create.prototype = factor_proto;

module.exports = factor;
