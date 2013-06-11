;(function(root) {

var CONST = {

    SPUR_MIN: 0.1,
    SPUR_MAX: 1,

    FINE_MIN: -0.1,
    FINE_MAX: -1,

    VALUE_NTR: 'n',
    VALUE_DEL: 'd',

    REPLACER_NTR: 2,
    REPLACER_DEL: 3

};

var crypto = {
    createHash: function() { return this; },
    update: function(data) { this._data = data; return this; },
    digest: function (string) {
        string = this._data;

        function cmn(q, a, b, x, s, t) {
            a = add32(add32(a, q), add32(x, t));
            return add32((a << s) | (a >>> (32 - s)), b);
        }


        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        function md5cycle(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];

            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17,  606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12,  1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7,  1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7,  1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22,  1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14,  643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9,  38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5,  568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20,  1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14,  1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16,  1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11,  1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4,  681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23,  76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16,  530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10,  1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6,  1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6,  1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21,  1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15,  718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);

        }


        function md51(s) {
            var txt = '';
            var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878], i;
            for (i=64; i<=n; i+=64) {
                md5cycle(state, md5blk(s.substring(i-64, i)));
            }
            s = s.substring(i-64);
            var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], sl=s.length;
            for (i=0; i<sl; i++) tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
            tail[i>>2] |= 0x80 << ((i%4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                i=16;
                while (i--) { tail[i] = 0; }
            }
            tail[14] = n*8;
            md5cycle(state, tail);
            return state;
        }

        function md5blk(s) {
            var md5blks = [], i;
            for (i=0; i<64; i+=4) {
                md5blks[i>>2] = s.charCodeAt(i) + (s.charCodeAt(i+1) << 8) + (s.charCodeAt(i+2) << 16) + (s.charCodeAt(i+3) << 24);
            }
            return md5blks;
        }

        var hex_chr = '0123456789abcdef'.split('');

        function rhex(n)
        {
            var s='', j=0;
            for(; j<4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
            return s;
        }

        function hex(x) {
            var l=x.length;
            for (var i=0; i<l; i++) x[i] = rhex(x[i]);
            return x.join('');
        }

        function add32(a, b) {
            return (a + b) & 0xFFFFFFFF;
        }

        if (hex(md51("hello")) != "5d41402abc4b2a76b9719d911017c592") {
            function add32(x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            }
        }

        return hex(md51(string));
    }
};
var math = {

    /**
     * Returns linear function for the given points
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     *
     * @return Function
     */
    linear: function(x1, y1, x2, y2) {

        // increasing or decreasing function
        return (x2 - x1 > 0) === (y2 - y1 > 0) ?
            function linear(x) { return y1 + (x - x1) * (y2 - y1) / (x2 - x1); } :
            function linear(x) { return y2 + (x2 - x) * (y1 - y2) / (x2 - x1); };
    },

    /**
     * Returns min value in array
     *
     * @param {Array} values
     *
     * @return Number
     */
    min: function(values) {
        return Math.min.apply(null, values);
    },

    /**
     * Returns max value in array
     *
     * @param {Array} values
     *
     * @return Number
     */
    max: function(values) {
        return Math.max.apply(null, values);
    },

    /**
     * Returns sum of values in array
     *
     * @param {Array} values
     *
     * @return Number
     */
    sum: function(values) {
        return values.reduce(function(a, b) { return a + b; }, 0);
    },

    /**
     * Returns arithmetic mean for the array of values
     *
     * @param {Array} values
     *
     * @return Number
     */
    mean: function(values) {
        return values.length ? math.sum(values) / values.length : 0;
    },

    /**
     * Returns mode of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    mode: function(values) {
        var maxVal = values[0];
        var maxFreq = -Infinity;
        var counts = {};

        values.forEach(function(val) {
            var freq = counts[val] = (counts[val] || 0) + 1;
            if (freq > maxFreq) {
                maxVal = val;
                maxFreq = freq;
            }
        });

        return maxVal;
    },


    /**
     * Retruns median of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    median: function(values) {
        if (!values.length) {
            return 0;
        }

        var sorted = values.slice().sort(function(a, b) { return a - b; });
        var middle = Math.ceil(values.length / 2) - 1;

        return sorted.length % 2 ?
            sorted[ middle ] : math.mean([sorted[ middle ], sorted[ middle + 1 ]]);
    },

    /**
     * Returns cardinality of the array (number of uniq elements)
     *
     * @param {Array} values
     *
     * @return Number
     */
    cardinal: function(values) {
        var card = 0;
        var uniqs = {};

        values.forEach(function(val) {
            if ( !(val in uniqs) ) {
                uniqs[val] = true;
                card++;
            }
        });

        return card;
    },

    /**
     * Returns variance of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    variance: function(values) {
        var m = math.mean(values);
        var pow = Math.pow;

        return math.mean( values.map(function(val) { return pow(m - val, 2); }) );
    },

    /**
     * Returns standart deviation of the array
     *
     * @param {Array} values
     *
     * @return Number
     */
    deviation: function(values) {
        return Math.sqrt( math.variance(values) );
    },

    /**
     * Returns mean difference beetwin elements in array
     *
     * @param {Array} values
     *
     * @return {Number}
     */
    step: function(values) {
        if (values.length < 2) {
            return 0;
        }

        var last;
        var abs = Math.abs;

        return values
            .sort(function(a, b) { return a - b; } )
            .reduce(function(a, b, i) {
                var diff = last === undefined ? abs(a - b) : abs(last - b);
                last = b;
                return (i > 1 ? a : 0) + diff;
            }) / (values.length - 1);
    }

};



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


root.rAnk = rAnk;
})(this);
