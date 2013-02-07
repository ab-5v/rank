var types = module.exports = {};

// save factor types in global scope
['MINMAX', 'MAXMIN', 'FILTER', 'BINARY']
    .forEach(function(val, i) { types['F_' + val] = this['F_' + val] = i + 1; });
