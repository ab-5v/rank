var CONST = require('../../lib/const');

var MIN = CONST.REPLACER_MIN;
var MAX = CONST.REPLACER_MAX;
var DEL = CONST.REPLACER_DEL;

var D = CONST.VALUE_DEL;

module.exports = {
    none: {
        rule: null,
        data: [0, 1, 2, 3, 4, 5],
        rslt: [0, 0.2, 0.4, 0.6, 0.8, 1]
    },
    none_invert: {
        rule: null,
        data: [0, 1, 2, 3, 4, 5],
        rslt: [1, 0.8, 0.6, 0.4, 0.2, 0],
        invert: true
    },
    min1: {
        rule: { 0: MIN },
        data: [undefined, 3, 2, 1, 4, 5],
        rslt: [0, 0.6, 0.4, 0.2, 0.8, 1]
    },
    min2: {
        rule: { 1: MIN, 2: MIN },
        data: [1, undefined, undefined, 3, 2, 4, 5],
        rslt: [0.2, 0, 0, 0.6, 0.4, 0.8, 1]
    },
    min3: {
        rule: { 0: MIN, 2: MIN},
        data: [undefined, 2, undefined, 2],
        rslt: [0, 1, 0, 1]
    },
    max1: {
        rule: { 1: MAX },
        data: [0, undefined, 3, 4, 1, 2],
        rslt: [0, 1, 0.6, 0.8, 0.2, 0.4]
    },
    max2: {
        rule: { 2: MAX, 3:MAX},
        data: [5, 5, undefined, undefined],
        rslt: [0, 0, 1, 1]
    },
    del1: {
        rule: { 2: DEL },
        data: [0, 5, undefined, 4],
        rslt: [0, 1, D, 0.8]
    },
    del2: {
        rule: { 1: DEL, 3: DEL },
        data: [3, undefined, 3, undefined],
        rslt: [0, D, 0, D]
    },
    com1: {
        rule: { 1: MIN, 3: MAX },
        data: [4, undefined, 2, undefined, 3, 1],
        rslt: [0.8, 0, 0.4, 1, 0.6, 0.2]
    },
    com2: {
        rule: { 1: MIN, 3: MAX },
        data: [4, undefined, 4, undefined, 4],
        rslt: [0.5, 0, 0.5, 1, 0.5]
    },
    all1: {
        rule: { 0: DEL, 3: MIN, 4: MAX },
        data: [undefined, 2, 1, undefined, undefined, 4, 3],
        rslt: [D, 0.4, 0.2, 0, 1, 0.8, 0.6]
    },
    all2: {
        rule: { 0: DEL, 1: MIN, 3: MIN, 2: MAX },
        data: [undefined, undefined, undefined, undefined],
        rslt: [D, 0, 1, 0]
    },
    all3: {
        rule: { 0: DEL, 1: MIN, 3: MAX },
        data: [undefined, undefined, 7, undefined, 7],
        rslt: [D, 0, 0.5, 1, 0.5]
    }
};
