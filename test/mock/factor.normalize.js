var D = require('../../lib/const').VALUE_DEL;

module.exports = {
    reg1: {
        mmax: { min: 0, max: 5 },
        data: [0, 2,   4,   5],
        rslt: [0, 0.4, 0.8, 1],
        invert: false
    },
    reg2: {
        mmax: { min: 0, max: 5 },
        data: [0, 2,   4,   5],
        rslt: [1, 0.6, 0.2, 0],
        invert: true
    },
    reg3: {
        mmax: { min: 0, max: 10 },
        data: [5,   1,  7,   10, 0],
        rslt: [0.5, 0.1, 0.7, 1, 0]
    },
    reg4: {
        mmax: { min: 5, max: 10 },
        data: [7,   5, 9,  10],
        rslt: [0.4, 0, 0.8, 1]
    },
    reg5: {
        mmax: { min: 5, max: 10 },
        data: [7,   5, 9,  10],
        rslt: [0.6, 1, 0.2, 0],
        invert: true
    },
    reg6: {
        mmax: { min: 5, max: 10 },
        data: [9,  10, 5, 7,   9],
        rslt: [0.8, 1, 0, 0.4, 0.8]
    },
    reg7: {
        mmax: { min: 5, max: 10 },
        data: [8,  10, 9,   5, 6,   5],
        rslt: [0.6, 1, 0.8, 0, 0.2, 0]
    },
    reg8: {
        mmax: { min: 5, max: 10 },
        data: [8,  10, 10, 5, 5, 10],
        rslt: [0.4, 0,  0, 1, 1,  0],
        invert: true
    },
    reg9: {
        mmax: { min: 5, max: 5 },
        data: [5, 5, 5, 5],
        rslt: [0, 0, 0, 0]
    },
    del1: {
        mmax: { min: 0, max: 5 },
        data: [0, D, 4,   5],
        rslt: [0, D, 0.8, 1]
    },
    del2: {
        mmax: { min: 5, max: 10 },
        data: [D,  10, 10, 5, 5, 10],
        rslt: [D,   0,  0, 1, 1,  0],
        invert: true
    },
    del3: {
        mmax: { min: 3, max: 3 },
        data: [3, 3, 3,  D],
        rslt: [0, 0, 0, -1]
    },
    del4: {
        mmax: { min: 3, max: 3 },
        data: [3, 3, 3,  D],
        rslt: [0, 0, 0, -1],
        invert: true
    }
};
