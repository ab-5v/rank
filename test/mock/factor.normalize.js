var D = require('../../lib/const').VALUE_DEL;
var N = require('../../lib/const').VALUE_NTR;

var mock_factor_normalize = {
    spur1: {
        spur: { min: 0, max: 5 },
        fine: {},
        data: [0, 3,   4,   5],
        rslt: [0.1, 0.64, 0.82, 1],
        invert: false
    },
    spur2: {
        spur: { min: 0, max: 5 },
        fine: {},
        data: [0, 2,   4,   5],
        rslt: [1, 0.64, 0.28, 0.1],
        invert: true
    },
    spur3: {
        spur: { min: 5, max: 10 },
        fine: {},
        data: [8,   5, 9,  10, 6],
        rslt: [0.64, 0.1, 0.82, 1, 0.28]
    },
    spur4: {
        spur: { min: 5, max: 10 },
        fine: {},
        data: [7,   5, 9,  10],
        rslt: [0.64, 1, 0.28, 0.1],
        invert: true
    },
    spur5: {
        spur: { min: 5, max: 10 },
        fine: {},
        data: [8,  10, 9,   5, 6,   5],
        rslt: [0.64, 1, 0.82, 0.1, 0.28, 0.1]
    },
    spur6: {
        spur: { min: 5, max: 10 },
        fine: {},
        data: [9,  10, 10, 5, 5, 10],
        rslt: [0.28, 0.1,  0.1, 1, 1,  0.1],
        invert: true
    },
    spur7: {
        spur: { min: 5, max: 5 },
        fine: {},
        data: [5, 5, 5, 5],
        rslt: [1, 1, 1, 1]
    },
    fine1: {
        spur: {},
        fine: { min: -1, max: -9 },
        data: [-5,   -1,  -6,   -9],
        rslt: [-0.55, -0.1, -0.6625, -1]
    },
    fine2: {
        spur: {},
        fine: { min: -3, max: -3},
        data: [-3, -3, -3],
        rslt: [-1, -1, -1]
    },
    fine3: {
        spur: {},
        fine: { min: -1, max: -9 },
        data: [-5,   -1,  -6,   -9],
        rslt: [-0.55, -0.1, -0.6625, -1],
        invert: true
    },
    fine4: {
        spur: {},
        fine: { min: -3, max: -3},
        data: [-3, -3, -3],
        rslt: [-1, -1, -1],
        invert: true
    },
    com1: {
        spur: { min: 5, max: 10 },
        fine: { min: -1, max: -9 },
        data: [8,    5,   9,    -9, -5,   10, 6,    -1],
        rslt: [0.64, 0.1, 0.82, -1, -0.55, 1, 0.28, -0.1]
    },
    com2: {
        spur: { min: 5, max: 10 },
        fine: { min: -1, max: -9 },
        data: [7,    5, 9,    -9, -5,   10,   -1],
        rslt: [0.64, 1, 0.28, -1, -0.55, 0.1, -0.1],
        invert: true
    },
    com3: {
        spur: { min: 3, max: 3 },
        fine: { min: -1, max: -9 },
        data: [-9, -5,    3, 3, -1],
        rslt: [-1, -0.55, 1, 1, -0.1]
    },
    com4: {
        spur: { min: 0, max: 5 },
        fine: { min: -1, max: -9 },
        data: [-9, -5,    0, 5, -1],
        rslt: [-1, -0.55, 0.1, 1, -0.1]
    },
    del1: {
        spur: { min: 0, max: 5 },
        fine: {},
        data: [0, D, 4,   5],
        rslt: [0.1, D, 0.82, 1]
    },
    del2: {
        spur: { min: 5, max: 10 },
        fine: {},
        data: [D,  10, 10, 5, 5, 10],
        rslt: [D,   0.1,  0.1, 1, 1,  0.1],
        invert: true
    },
    del3: {
        spur: { min: 3, max: 3 },
        fine: {},
        data: [3, 3, 3, D],
        rslt: [1, 1, 1, D]
    },
    del4: {
        spur: { min: 3, max: 3 },
        fine: {},
        data: [3, 3, 3, D],
        rslt: [1, 1, 1, D],
        invert: true
    },
    del5: {
        spur: {},
        fine: { min: -1, max: -9 },
        data: [-5,   -1,  D,   -9],
        rslt: [-0.55, -0.1, D, -1]
    },
    del6: {
        spur: {},
        fine: { min: -3, max: -3},
        data: [-3, D, -3],
        rslt: [-1, D, -1]
    },
    ntr1: {
        spur: { min: 0, max: 5 },
        fine: {},
        data: [0, N, 4,   5],
        rslt: [0.1, N, 0.82, 1]
    },
    ntr2: {
        spur: { min: 5, max: 10 },
        fine: {},
        data: [N,  10, 10, 5, 5, 10],
        rslt: [N,   0.1,  0.1, 1, 1,  0.1],
        invert: true
    },
    ntr3: {
        spur: {},
        fine: { min: -3, max: -3},
        data: [N, -3, -3],
        rslt: [N, -1, -1]
    },
    all1: {
        spur: { min: 5, max: 10 },
        fine: { min: -1, max: -9 },
        data: [7,    5, 9,    N, -9, -5,    D, 10,   -1],
        rslt: [0.64, 1, 0.28, N, -1, -0.55, D,  0.1, -0.1],
        invert: true

    }
};

module.exports = mock_factor_normalize;
