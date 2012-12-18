var vars = require('./vars');
var util = require('./util');

var types = vars.FACTORTYPE;

var defaults = {
    // need to overwrite by user
    name: null,
    run: null,
    // defaults
    type: types.RANK,
    key: function(item) { return item; }
};

/**
 * Factor constructor
 *
 * @param {Object} description
 */
var Factor = function(description) {
    util.extend(this, defaults, description);

    // TODO: check required fields
};

var distribution = Factor.prototype.distribution = {};

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
    return sorted;
};

/**
 * Factor execution
 * works via user defined function `run`
 * @private
 * @param {Array} data
 * @param {Object} conditions
 */
Factor.prototype.exec = function(data, conditions) {
    // sorting via user method run
    var sorted = this.run(util.clone(data), conditions);
    // converting sorting to distribution of marks
    return this.distribution[this.type].call(this, data, sorted);
}

module.exports = Factor;
