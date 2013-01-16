var rAnk = require('../../lib/rAnk');

var data = require('./data');
var factors = require('./factors');

var list = function(data) {
    return data.map(function(item, i) {
        return (i % 7 ? '' : '\n') + '(' + item.join(', ') + ')';
    }).join(', ');
}

// list factors
console.log('Factors:');
factors.forEach(function(factor) { console.log(factor.name); });

// load factors into formuls `sole3`
rAnk.formula('sole3', factors);

// list data
console.log('Data:' + list(data));

// apply factors
rAnk.run('sole3', data, {})
    .then(function(sorted) {
        // list sorted data
        console.log('Sorted:' + list(sorted));
    });
