var CONST = require('../../lib/const');

var MIN = CONST.REPLACER_MIN;
var MAX = CONST.REPLACER_MAX;
var NTR = CONST.REPLACER_NTR;
var DEL = CONST.REPLACER_DEL;

var D = CONST.VALUE_DEL;
var N = CONST.VALUE_NTR;

var mock_factor_done = {
    none: {
        rule: null,
        data: [0, 1, 3, 4, 5],
        rslt: [0.1, 0.28, 0.64, 0.82, 1]
    },
    none_invert: {
        rule: null,
        data: [0, 1, 2, 4, 5],
        rslt: [1, 0.82, 0.64, 0.28, 0.1],
        invert: true
    },
    undef: {
        rule: null,
        data: ['asd', undefined, null, function() {}],
        rslt: [N, N, N, N]
    },
    fine1: {
        rule: null,
        data: [-5,   -1,  -6,   -9],
        rslt: [-0.55, -0.1, -0.6625, -1]
    },
    fine2: {
        rule: null,
        data: [-5,   -1,  -6,   -9],
        rslt: [-0.55, -0.1, -0.6625, -1],
        invert: true
    },
    com1: {
        rule: null,
        data: [-5, -1, 0, 4, 8, -9],
        rslt: [-0.55, -0.1, 0.1, 0.55, 1, -1]
    },
    del1: {
        rule: { 2: DEL },
        data: [0, 5, undefined, 4],
        rslt: [0.1, 1, D, 0.82]
    },
    del2: {
        rule: { 1: DEL, 3: DEL },
        data: [3, undefined, 3, undefined],
        rslt: [1, D, 1, D]
    },
    ntr1: {
        rule: { 2: NTR },
        data: [0, 5, undefined, 4],
        rslt: [0.1, 1, N, 0.82]
    },
    ntr2: {
        rule: { 1: NTR, 3: NTR },
        data: [3, undefined, 3, undefined],
        rslt: [1, N, 1, N]
    },
    all1: {
        rule: { 1: NTR, 3: DEL },
        data: [3, undefined, -1, undefined, 5, -4],
        rslt: [0.1, N, -0.1, D, 1, -1]
    },
    all4: {
        rule: { 0: DEL, 1: DEL, 2: NTR, 3: NTR },
        data: [undefined, undefined, undefined, undefined],
        rslt: [D, D, N, N]
    }
};

module.exports = mock_factor_done;
