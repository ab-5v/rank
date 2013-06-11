var rAnk = require('../../lib/rAnk');

var data = require('./data'), sorted;
var factors = require('./factors');

var list = function(data) {
    return data.map(function(item, i) {
        return (i % 7 ? '' : '\n') + '(' + item.join(', ') + ')';
    }).join(', ');
}

// list factors
console.log('Factors:');
factors.forEach(function(factor) { console.log(factor.name); });

// list data
console.log('Data:' + list(data));

// apply factors
sorted = rAnk()
    .factors(factors)
    .data(data)
    .run();

// list sorted data
console.log('Sorted:' + list(sorted.data));
