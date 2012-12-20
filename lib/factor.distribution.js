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

module.exports = distribution;
