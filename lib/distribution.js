var math = require('./util').math;

/**
 * Distibutions for different types
 */
var distribution = {};

distribution[F_SORT] = function(data, sorted) {
    var key = this.key;
    // reverse while we are going to take indexOf
    var sortedKeys = sorted.map(key).reverse();

    return data.map(function(item) {
        return sortedKeys.indexOf( key(item) ) + 1;
    });
};

distribution[F_BINARY] = function(data, sorted) {
    var max = sorted.length;

    return sorted.map(function(item) {
        return item ? max : 0;
    });
};

distribution[F_FILTER] = function(data, sorted) {
    var key = this.key;

    if (data.length == sorted.length) {
        return [];
    }
    var keys = sorted.map(key);

    return data.map(function(item) {
        // `-1` means that we should remove item
        return keys.indexOf( key(item) ) === -1 ? -1 : 0;
    });
};

distribution[F_MAXMIN] = function(data, values) {

    return values.map(
        math.linear( math.min(values), values.length, math.max(values), 1 )
    );
};

distribution[F_MINMAX] = function(data, values) {

    return values.map(
        math.linear( math.min(values), 1, math.max(values), values.length )
    );
};

module.exports = distribution;
