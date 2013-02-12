var math = require('./math');

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

        this._values = [];
        this._replacements = {};

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
     * @param {Number} i
     */
    minValue: function(i) {
        i = i || this._index;
        this._replacements[i] = CONST.REPLACER_MIN;
    },

    /**
     * Marks i'th item to get max value in a set
     *
     * @param {Number} i
     */
    maxValue: function(i) {
        i = i || this._index;
        this._replacements[i] = CONST.REPLACER_MAX;
    },

    /**
     * Marks i'th item to be removed
     *
     * @param {Number}
     */
    removeItem: function(i) {
        i = i || this._index;
        this._replacements[i] = CONST.REPLACER_DEL;
    },

    /**
     * Object with min/max/delValue replacements
     *
     * @private
     * @type Object
     */
    _replacements: null,

    /**
     * Creates replacer object for filled `_replacements` proptery
     * based on `values` withoud replacements
     *
     * @private
     * @param {Array} value
     * @return Object
     */
    replacer: function(values) {
        var step;
        var replacer = {};

        // default values
        replacer[CONST.REPLACER_MIN] = CONST.LIMIT_MIN;
        replacer[CONST.REPLACER_MAX] = CONST.LIMIT_MAX;
        replacer[CONST.REPLACER_DEL] = CONST.VALUE_DEL;

        // in case of one item left
        // min=0 -[item]- item -[item]- max=2*item
        if (values.length === 1) {
            replacer[CONST.REPLACER_MIN] = 0;
            replacer[CONST.REPLACER_MAX] = values[0] * 2;
        // in case of more than one different items
        // min -[step]- item -[?]- item -[?]- item -[step]- max
        } else if (values.length > 1) {
            step = math.step(values);
            replacer[CONST.REPLACER_MIN] = math.max([0, math.min(values) - step]);
            replacer[CONST.REPLACER_MAX] = math.max(values) + step;
        }

        return replacer;
    },

    /**
     * Applies replacements to the value array
     *
     * @private
     * @param {Array} values
     * @type Array
     */
    replacements: function(values) {
        var replacer;
        var remained = [];
        var remainedObj = {};
        var replacements = this._replacements;
        var replacementsKeys = Object.keys(replacements);

        if (replacementsKeys.length) {
            // remove all replacements, keep only uniq values
            values.forEach(function(val, i) {
                if (!(i in replacements || val in remainedObj)) {
                    remainedObj[val] = 1;
                    remained.push(val);
                }
            });
            // form replacer object
            replacer = this.replacer(remained);
            // replace all replacements to calculated values
            replacementsKeys.forEach(function(i) {
                values[i] = replacer[ replacements[i] ];
            });
        }

        return values;
    },

    /**
     * Maps returned values to normolized values
     *
     * @private
     * @param {Array} replaced
     *
     * @return Array
     */
    normalize: function(replaced) {

        var replMin = math.min(replaced);
        var replMax = math.max(replaced);

        // this factor does not matter anything
        if (replMin === replMax) {
            return replaced.map(function() { return 0; });
        }

        // chose right linear function
        var linear = !this.invert ?
            math.linear( replMin, CONST.LIMIT_MIN, replMax, CONST.LIMIT_MAX ):
            math.linear( replMin, CONST.LIMIT_MAX, replMax, CONST.LIMIT_MIN );

        return replaced.map(function(val) {
            // calculate all except VALUE_DEL
            return val === CONST.VALUE_DEL ? val : linear(val);
        });
    },

    /**
     * Calculates value for item and adds one to the resulting `_values` array
     *
     * @param {Object} item
     * @param {Object} cond
     */
    addValue: function(i, item, cond) {
        this._index = i;
        this._values[i] = this.value(item, cond);
    },

    exec: function(data, cond) {
        var that = this;
        var promise = pzero();

        var done = function(values) {
            // replace constants
            var replaced = that.replacements();
            // resolve promise with marks
            promise.resolve( that.normolize(replaced) );
        };

        // if already done by value-one function
        if (!this.isAll) {
            done(this._values);
        // otherwise it's valueAll calls
        } else if (this.valueAll.length > 2) {
            // for async calls
            this.valueAll(data, cond, done);
        } else {
            // for sync calls
            done( this.valueAll(data, cond) );
        }

        return promise;
    },

    /**
     * Calculates value for current item
     *
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
