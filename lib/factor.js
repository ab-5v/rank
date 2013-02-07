var util = require('./util');
var dist = require('./distribution');

/**
 * Factor constructor
 *
 * @constructor
 * @param {Object} description
 * @param   {String}    description.type
 * @param   {Function}  description.key
 * @param   {Function}  description.run
 */
var Factor = function(description) {
    util.extend( this, util.filter(description, ['name', 'type', 'key', 'run']) );
};

Factor.prototype = {

    /**
     * Type of factor
     * @private
     * @type Number
     */
    type: F_MINMAX,

    /**
     * In MIXMAX factors you can replace your value with this constatnts,
     * then in distribution procces it will be replaced to the min or max values
     * from your actual values
     *
     * @type Number
     */
    minValue: -Infinity,
    maxValue: +Infinity,

    /**
     * Replaces constatns to actual in one step of min or max values
     * if all values are constatns, then replaces to limits
     *
     * @param {Array} values
     * @param {Object} limits
     *
     * @return Array
     */
    constants: function(values, limits) {
        var minConst = this.minValue;
        var maxConst = this.maxValue;

        var minValue = limits.min;
        var maxValue = limits.max;

        if (values.indexOf(minConst) === -1 && values.indexOf(maxConst) === -1) {
            return values;
        }

        var filtered = values.filter(function(val) { return val !== minConst && val !== maxConst; });
        // if array contains not only constants
        if (filtered.length) {
            minValue = this.math.min( filtered );
            maxValue = this.math.max( filtered );
        }

        // be carefull — it sorts original array
        var step = this.math.step( filtered );

        return values.map(function(val) {
            if (val === minConst) {
                return minValue - step;
            }
            if (val === maxConst) {
                return maxValue + step;
            }
            return val;
        });
    },


    /**
     * Helps to compare objects in original and sorted arrays
     * @private
     * @param {Object} item
     * @return String
     */
    key: function(item) {
        return item;
    },

    /**
     * Creates a distribution on the ground of how factor sorts or filters the data
     * @see distributions object for different factor types realization
     * @private
     * @param {Array} data
     * @param {Array} sorted
     * @return Array
     */
    distribution: function(data, sorted) {
        this.distribution = dist[ this.type ];
        return this.distribution.apply(this, arguments);
    },

    /**
     * User defined processing function
     * must be overwritten
     * @param {Array} data
     * @param {Object} conditions
     * @return Array
     */
    run: function(data, conditions) {
        throw Error('Must be overwritten');
    },

    /**
     * Executes factor on given data and conditions
     * and calls user defined `run` method
     * @param data
     * @param conditions
     * @return Array of data distribution
     */
    exec: function(data, conditions) {
        var that = this;
        var promise = util.promise();

        // async callback for user method `run`
        var done = function done(sorted) {
            // converting sorting to distribution of marks
            // and resolve promise
            promise.resolve( sorted );
        }

        // sorting via user method `run`
        var sorted = this.run(util.clone(data), conditions, done);

        // if not async call of run - resolve now
        if (this.run.length < 3) {
            done(sorted);
        }

        return promise;
    },

    math: util.math
};

module.exports = Factor;
