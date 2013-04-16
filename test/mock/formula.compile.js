var D = require('../../lib/const').VALUE_DEL;
var N = require('../../lib/const').VALUE_NTR;

var mock_formula_compile = {
    'empty': {
        data: [],
        wght: [],
        mark: [],
        rslt: {
            stat: [],
            data: [],
            weight: []
        }
    },

    'one data, one factor': {
        data: [1],
        wght: [1],
        mark: [[10]],
        rslt: {
            stat: [[10]],
            data: [1],
            weight: [1]
        }
    },

    'many data, one factor': {
        data: [1, 2, 3],
        wght: [1],
        mark: [[2, 2, 3]],
        rslt: {
            stat: [[3], [2], [2]],
            data: [3, 1, 2],
            weight: [1]
        }
    },

    'many data, many factor': {
        data: [1, 2, 3],
        wght: [1, 1],
        mark: [[2, 2, 3], [2, 4, 1]],
        rslt: {
            stat: [[2, 4], [2, 2], [3, 1]],
            data: [2, 1, 3],
            weight: [1, 1]
        }
    },

    'many, many, weight': {
        data: [1, 2, 3],
        wght: [1, 0.5],
        mark: [[2, 2, 4], [4, 4, 1]],
        rslt: {
            stat: [[4, 1], [2, 4], [2, 4]],
            data: [3, 1, 2],
            weight: [1, 0.5]
        }
    },

    'many, many, del': {
        data: [1, 2, 3],
        wght: [1, 1],
        mark: [[2, 2, 1], [1, D, 3]],
        rslt: {
            stat: [[1, 3], [2, 1]],
            data: [3, 1],
            weight: [1, 1]
        }
    },
    'many, many, ntr': {
        data: [1, 2, 3],
        wght: [1, 1],
        mark: [[2, 2, 4], [4, N, 1]],
        rslt: {
            stat: [[2, 4], [4, 1], [2, 0]],
            data: [1, 3, 2],
            weight: [1, 1]
        }
    }
};

module.exports = mock_formula_compile;
