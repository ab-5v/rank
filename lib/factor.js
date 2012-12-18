var vars = require('./vars');
var types = vars.FACTORTYPE;

var Factor = function(description) {
    this.name = description.name;
    this.type = description.type || types.RANK;
    this.exec = description.exec;
};

Factor.prototype = {
    distribution: function(orig, sorted, key) {
        return [];
    }
};

module.exports = Factor;
