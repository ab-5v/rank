var vars = require('./vars');
var util = require('./util');
var dist = require('./distribution');

var types = vars.FACTORTYPE;

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
    type: types.RANK,

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
            promise.resolve( that.distribution(data, sorted) );
        }

        // sorting via user method `run`
        var sorted = this.run(util.clone(data), conditions, done);

        // if not async call of run - resolve now
        if (this.run.length < 3) {
            done(sorted);
        }

        return promise;
    }
};

module.exports = Factor;
