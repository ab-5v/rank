var vars = require('./vars');

var types = vars.FACTORTYPE;
/**
 * Distibutions for different types
 */
var distribution = {};

distribution[types.RANK] = function(data, sorted) {
    var that = this;
    // reverse while we are going to take indexOf
    var sortedKeys = sorted.map(this.key).reverse();

    return data.map(function(item) {
        return sortedKeys.indexOf( that.key(item) );
    });
};

distribution[types.BINARY] = function(data, sorted) {
    var max = sorted.length - 1;

    return sorted.map(function(item) {
        return item ? max : 0;
    });
};

distribution[types.FILTER] = function(data, sorted) {
    var that = this;

    if (data.length == sorted.length) {
        return [];
    }
    var keys = sorted.map(this.key);

    return data.map(function(item) {
        // `-1` means that we should remove item
        return keys.indexOf( that.key(item) ) === -1 ? -1 : 0;
    });
};

distribution[types.MINMAX] = function(data, values) {
    var sorted = values.slice().sort(function(a, b) { return a - b; });
    var max = values.length - 1;
    var minValue = sorted[0];
    var maxValue = sorted[max];

    return values.map(function(value) {
        return max * ( value - minValue ) / ( maxValue - minValue );
    });
};

module.exports = distribution;
