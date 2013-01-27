var math = require('./util').math;

/**
 * Distibutions for different types
 */
var distribution = {};

distribution[F_SORT] = function(limits, data, sorted) {
    var key = this.key;
    // reverse while we are going to take indexOf
    var keys = sorted.map(key).reverse();
    var linear = math.linear( 0, limits.min, keys.length - 1, limits.max )

    return data.map(function(item) {
        return linear( keys.indexOf( key(item) ) );
    });
};

distribution[F_BINARY] = function(limits, data, sorted) {

    return sorted.map(function(item) {
        return item ? limits.max : 0;
    });
};

distribution[F_FILTER] = function(limits, data, sorted) {
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

distribution[F_MINMAX] = function(limits, data, values) {

    return values.map(
        math.linear( math.min(values), limits.min, math.max(values), limits.max )
    );
};

distribution[F_MAXMIN] = function(limits, data, values) {

    return values.map(
        math.linear( math.min(values), limits.max, math.max(values), limits.min )
    );
};

module.exports = distribution;
