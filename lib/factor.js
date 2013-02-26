var math = require('./math');
var pzero = require('p0');

var CONST = {
    LIMIT_MIN: 0,
    LIMIT_MAX: 1,
    VALUE_DEL: -1,

    REPLACER_MIN: 0,
    REPLACER_MAX: 1,
    REPLACER_DEL: -1
};

var factor, proto;

/**
 * @class factor
 */
factor = module.exports = function(description) {
    return new proto._create(description);
};

proto = factor.prototype = {

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
        if (!descr.id) {
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
     * Marks i'th item to get min value in a set
     *
     * @public
     * @param {Number} i
     */
    minValue: function(i) {
        this.replacement(i || this._index, CONST.REPLACER_MIN);
    },

    /**
     * Marks i'th item to get max value in a set
     *
     * @public
     * @param {Number} i
     */
    maxValue: function(i) {
        this.replacement(i || this._index, CONST.REPLACER_MAX);
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
     * Calculates minimal and maxival values through all values
     *
     * @private
     * @param {Array} values
     * @return Object
     */
    minmax: function(values) {
        var minValue, maxValue, hasMin, hasMax, result, step;
        var repl = this._replacements;
        var remained = [];

        // no replacements
        if (!repl) {
            result = { min: math.min(values), max: math.max(values) };
        } else {
            values.forEach(function(value, i) {
                // check which replacements we have
                if (i in repl) {
                    if (repl[i] === CONST.REPLACER_MIN) { hasMin = true; }
                    else if (repl[i] === CONST.REPLACER_MAX) { hasMax = true; }
                }
                // if real value
                else {
                    // collecting min and max values
                    if (minValue === undefined || minValue > value) { minValue = value; }
                    if (maxValue === undefined || maxValue < value) { maxValue = value; }
                    // saving all real values
                    remained.push(value);
                }
            });

            if (minValue === maxValue) {
                // all values are replacements
                if (minValue === undefined) {
                    // default synthetic values
                    result = { min: CONST.LIMIT_MIN, max: CONST.LIMIT_MAX };
                // only one
                } else {
                    // min=0 -[item]- item -[item]- max=2*item
                    result = { min: hasMin ? 0 : minValue, max: hasMax ? 2 * minValue : minValue };
                }
            } else {
                if (hasMin || hasMax) {
                    step = math.step(remained);
                }
                minValue = !hasMin ? minValue : math.max([0, minValue - step]);
                maxValue = !hasMax ? maxValue : maxValue + step;
                // min -[step]- item -[~step]- item -[~step]- item -[step]- max
                result = { min: minValue, max: maxValue };
            }
        }

        return result;
    },

    /**
     * Applies replacements to the value array
     *
     * @private
     * @param {Array} values
     * @param {Object} minmax
     * @type Array
     */
    replacements: function(values, minmax) {
        var repl = this._replacements;
        var replacer = {};

        replacer[CONST.REPLACER_MIN] = minmax.min;
        replacer[CONST.REPLACER_MAX] = minmax.max;
        replacer[CONST.REPLACER_DEL] = CONST.VALUE_DEL;

        if (repl) {

            Object.keys(repl).forEach(function(i) {
                values[i] = replacer[ repl[i] ];
            });
        }

        return values;
    },

    /**
     * Maps returned values to normolized values
     *
     * @private
     * @param {Array} replaced
     * @param {Object} minmax
     *
     * @return Array
     */
    normalize: function(values, minmax) {
        var DEL = CONST.VALUE_DEL;

        // factor doesn't mean anything
        if (minmax.min === minmax.max) {
            return values.map(function(val) {
                // return neutral 0 for all except VALUE_DEL
                return val === DEL ? DEL : 0;
            });
        }

        // chose right linear function
        var linear = !this.invert ?
            math.linear( minmax.min, CONST.LIMIT_MIN, minmax.max, CONST.LIMIT_MAX ):
            math.linear( minmax.min, CONST.LIMIT_MAX, minmax.max, CONST.LIMIT_MIN );

        return values.map(function(val) {
            // calculate all except VALUE_DEL
            return val === DEL ? DEL : linear(val);
        });
    },

    /**
     * Prepares values, that retruns factor and resolves promise
     * with resulting marks
     *
     * @private
     * @param {Array} values
     * @param {pzero} promise
     */
    done: function(values, promise) {
        // calculate min and max values
        var minmax = this.minmax(values);
        // replace constants
        var replaced = this.replacements(values, minmax);
        // normolizing values
        var normalized = this.normalize(replaced, minmax);
        // resolve promise with marks
        promise.resolve( normalized );
    },

    /**
     * Executes factor and prepares it's final marks
     *
     * @protected
     * @param {Array} data
     * @param {Object} cond
     *
     * @type pzero
     */
    exec: function(data, cond) {
        var that = this;
        var promise = pzero();

        // if already done by value-one function
        if (!this.isAll) {
            this.done(this._values, promise);
        // otherwise it's valueAll calls
        } else if (this.valueAll.length > 2) {
            // for async calls
            this.valueAll(data, cond, function(values) { that.done(values, promise) });
        } else {
            // for sync calls
            this.done( this.valueAll(data, cond), promise );
        }

        return promise;
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

factor.CONST = CONST;

/**
 * Generates md5 hash for description
 */
factor.generateId = function(descr) {
    var res = [];

    for (var key in descr) {
        res.push( key + ':' + descr[key].toString() );
    }

    return require('crypto')
        .createHash('md5')
        .update( res.join(',') )
        .digest('hex');
};

proto._create.prototype = proto;
