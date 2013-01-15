var vars = require('../../lib/vars.js');
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
        type: vars.FACTORTYPE.BINARY,
        run: function(data) {
            return data.map(function(item) {
                return item % 2 ? true : false;
            });
        }
    },

    'gt3': {
        type: vars.FACTORTYPE.FILTER,
        run: function(data) {
            return data.filter(function(item) {
                return item > 3;
            });
        }
    },

    'lt5': {
        type: vars.FACTORTYPE.FILTER,
        run: function(data) {
            return data.filter(function(item) {
                return item < 5;
            });
        }
    }
};

module.exports = function(name) {
    return new Factor( data[name] );
};

module.exports.data = data;
