var Factor = require('../../lib/factor.js');

var data = {

    'sort plain': {
        run: function(data) {
            return data.sort();
        }
    },

    'sort obj': {
        key: function(item) {
            return item.i;
        },
        run: function(data) {
            return data.sort(function(a, b) {
                return a.i - b.i;
            })
        }
    },

    'only odd': {
        type: F_BINARY,
        run: function(data) {
            return data.map(function(item) {
                return item % 2 ? true : false;
            });
        }
    },

    'gt3': {
        type: F_FILTER,
        run: function(data) {
            return data.filter(function(item) {
                return item > 3;
            });
        }
    },

    'lt5': {
        type: F_FILTER,
        run: function(data) {
            return data.filter(function(item) {
                return item < 5;
            });
        }
    },

    'minmaxSimple': {
        type: F_MINMAX,
        run: function(data) {
            return data.map(function(item) {
                return item;
            });
        }
    },

    'minmaxObjI': {
        type: F_MINMAX,
        run: function(data) {
            return data.map(function(item) {
                return item.i;
            });
        }
    },

    'minmaxObjJ': {
        type: F_MINMAX,
        run: function(data) {
            return data.map(function(item) {
                return item.j;
            });
        }
    },

    'maxminSimple': {
        type: F_MAXMIN,
        run: function(data) {
            return data.map(function(item) {
                return item;
            });
        }
    }
};

module.exports = function(name) {
    return new Factor( data[name] );
};

module.exports.data = data;
