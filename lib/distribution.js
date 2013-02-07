var math = require('./util').math;

/**
 * Distibutions for different types
 */
var distribution = {};

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

var minmax = function(limits, values, inc) {

    var replaced = this.constants(values, limits);

    var replMin = math.min(replaced);
    var replMax = math.max(replaced);

    // this factor does not matter anything
    if (replMin === replMax) {
        return replaced.map(function() { return 0; });
    }

    return replaced.map(
        inc ?
            math.linear( replMin, limits.min, replMax, limits.max ) :
            math.linear( replMin, limits.max, replMax, limits.min )
    );

};

distribution[F_MINMAX] = function(limits, data, values) {

    return minmax.call(this, limits, values, true);
};

distribution[F_MAXMIN] = function(limits, data, values) {

    return minmax.call(this, limits, values, false);
};

module.exports = distribution;
