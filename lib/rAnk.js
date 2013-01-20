var vars = require('./vars');
var Factor = require('./factor');
var Formula = require('./formula');

var rAnk = {

    /**
     * @private
     */
    _formula: {},

    /**
     *
     */
    formula: function(name, factors) {

        if (arguments.length > 1) {
            this._formula[name] = new Formula( this.factor(factors) );
        }

        return this._formula[name];
    },

    /**
     * @private
     */
    _factor: {},

    /**
     * @private
     */
    factorOne: function(results, current) {
        var that = this;

        if (typeof current === 'object') {

            // already Factor
            if (current instanceof Factor) {

                this._factor[current.name] = current;
                results.push(current);

            // some Array
            } else if (Array.isArray(current)) {

                current.forEach(function(factor) {
                    that.factorOne(results, factor);
                });

            // factor description
            } else {

                this.factorOne( results, new Factor(current) );
            }

        } else if (typeof current === 'string') {

            // check if it is the name of factor
            if (this._factor[current]) {

                results.push(this._factor[current]);

            // trying to load external file
            } else {
                try {
                    this.factorOne( results, require(process.cwd() + '/' + current) )
                } catch(e) {}
            }
        }

    },

    /**
     * Returns given factor
     * @param {Object|Array|String}
     */
    factor: function(factor) {
        var args = Array.prototype.slice.apply(arguments);
        var results = [];

        while(factor = args.shift()) {
            this.factorOne(results, factor)
        }

        return results.length > 1 ? results : results[0];
    },

    /**
     *
     * @param {String} name of formula
     * @param {Array} data
     * @param {Object} conditions
     */
    run: function(name, data, conditions, weights) {
        return this.formula(name).run(data, conditions, weights);
    }
};

rAnk.factor.TYPES = vars.FACTORTYPE;


module.exports = rAnk;
