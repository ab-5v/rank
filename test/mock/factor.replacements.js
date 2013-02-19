var CONST = require('../../lib/factor').CONST;

var MIN = CONST.REPLACER_MIN;
var MAX = CONST.REPLACER_MAX;
var DEL = CONST.REPLACER_DEL;

var VDEL = CONST.VALUE_DEL;

var minmax = { min: 3, max: 8 };

module.exports = {
    min: {
        mmax: minmax,
        rule: { 0: MIN },
        data: [undefined, 2, 4, 9, 6],
        rslt: [3, 2, 4, 9, 6]
    },
    max: {
        mmax: minmax,
        rule: { 2: MAX, 4: MAX },
        data: [3, 2, undefined, 9, undefined],
        rslt: [3, 2, 8, 9, 8]
    },
    del: {
        mmax: minmax,
        rule: { 3: DEL },
        data: [3, 2, 4, undefined, 6],
        rslt: [3, 2, 4,-1, 6]
    },
    com: {
        mmax: minmax,
        rule: { 0: DEL, 2: MIN, 3: MAX },
        data: [undefined, 2, undefined, undefined, 6],
        rslt: [-1, 2, 3, 8, 6]
    },
    all: {
        mmax: minmax,
        rule: { 0: MAX, 1: MIN, 2: DEL, 3: MIN, 4: MAX },
        data: [undefined, undefined, undefined, undefined, undefined],
        rslt: [8, 3,-1, 3, 8]
    }
};
