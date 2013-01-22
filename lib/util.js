var util = module.exports = {};

util.math = require('./math');
util.promise = require('p0');
util.version = require('../package.json').version;

util.extend = function(dest) {

    for (var i = 0, l = arguments.length; i < l; i++) {
        var src = arguments[i];

        for (var key in src) {
            dest[key] = src[key];
        }
    }

    return dest;
};

// helpers
util.extend(util, {
    clone: function(src) {

        if (src === null || typeof src !== 'object') { return src; }

        var res = src.constructor();

        for (var key in src) {
            res[key] = util.clone( src[key] );
        }

        return res;
    },
    values: function(src) {
        var res = [];

        for (var key in src) {
            res.push( src[key] );
        }

        return res;
    },
    filter: function(obj, fields) {
        var res = {};
        fields.forEach(function(key) {
            if (key in obj) {
                res[key] = obj[key];
            }
        });
        return res;
    }
});


