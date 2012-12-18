var vars = require('./vars');

/**
 * Creates new formula instance
 * @param {String} name
 * @param {Array} factors
 */
var Formula = function(factors) {
    factors = factors || [];

    var cache = this.factors = {
        rank: [],
        binary: [],
        filter: []
    };
    this.ranks = {};

    factors.forEach(function(factor) {

        switch (factor.type) {

            case vars.FACTORTYPE.RANK:
                cache.rank.push(factor);
            break;

            case vars.FACTORTYPE.BINARY:
                cache.binary.push(factor);
            break;

            case vars.FACTORTYPE.FILTER:
                cache.filter.push(factor);
            break;

        }

    });
};

Formula.prototype = {

    /**
     *
     */
    exec: function(data, conditions) {
        var that = this;
        var weight = data.length;
        var factors = this.factors;

        factors.filter.forEach(function(factor) {
            data = factor(data, conditions);
        });

        factors.rank.forEach(function(factor) {
            that.ranks[factor.name] = factor(data, condition);
        });

        factors.binary.forEach(function() {
            var binary = that.binaries[factor.name] = [];
            data.forEach(function(item, i) {
                binary[i] = factor(item, condition) ? weight : 0;
            });
        });

        return this.merge();
    },

    /**
     * @private
     */
    merge: function() {
        return [];
    }
};

module.exports = Formula;
