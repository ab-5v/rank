var vars = require('./vars');
var util = require('./util');
var dist = require('./factor.distribution');

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
     * Executes factor on givven data and conditions
     * and calls user defined `run` method
     * @param data
     * @param conditions
     * @return Array of data distibution
     */
    exec: function(data, conditions) {
        // sorting via user method run
        var sorted = this.run(util.clone(data), conditions);
        // converting sorting to distribution of marks
        return this.distribution(data, sorted);
    }
};

module.exports = Factor;
