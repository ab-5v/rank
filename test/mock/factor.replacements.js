var CONST = require('../../lib/const');

var MIN = CONST.REPLACER_MIN;
var MAX = CONST.REPLACER_MAX;
var NTR = CONST.REPLACER_NTR;
var DEL = CONST.REPLACER_DEL;

var N = CONST.VALUE_NTR;
var D = CONST.VALUE_DEL;

var minmax = { min: 3, max: 8 };

var mock_factor_replacements = {
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
        rslt: [3, 2, 4, D, 6]
    },
    ntr: {
        mmax: minmax,
        rule: { 2: NTR },
        data: [3, 2, undefined, 4, 6],
        rslt: [3, 2, N, 4, 6]
    },
    com: {
        mmax: minmax,
        rule: { 0: DEL, 2: MIN, 3: MAX, 5: NTR },
        data: [undefined, 2, undefined, undefined, 6, undefined],
        rslt: [D, 2, 3, 8, 6, N]
    },
    all: {
        mmax: minmax,
        rule: { 0: MAX, 1: MIN, 2: NTR, 3: MIN, 4: MAX, 5: DEL },
        data: [undefined, undefined, undefined, undefined, undefined, undefined],
        rslt: [8, 3, N, 3, 8, D]
    }
};

module.exports = mock_factor_replacements;
