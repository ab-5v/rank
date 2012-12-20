var util = {};
util.version = require('../package.json').version;

util.clone = function(src) {

    if (src === null || typeof src !== 'object') { return src; }

    var res = src.constructor();

    for (var key in src) {
        res[key] = util.clone( src[key] );
    }

    return res;
};

util.values = function(src) {
    var res = [];

    for (var key in src) {
        res.push( src[key] );
    }

    return res;
};

util.extend = function(dest) {

    for (var i = 0, l = arguments.length; i < l; i++) {
        src = arguments[i];

        for (var key in src) {
            dest[key] = src[key];
        }
    }

    return dest;
};

util.filter = function(obj, fields) {
    var res = {};
    fields.forEach(function(key) {
        if (key in obj) {
            res[key] = obj[key];
        }
    });
    return res;
};

module.exports = util;
