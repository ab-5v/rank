var CONST = require('../../lib/const');

var MIN = CONST.REPLACER_MIN;
var MAX = CONST.REPLACER_MAX;
var DEL = CONST.REPLACER_DEL;

var LMIN = CONST.LIMIT_MIN;
var LMAX = CONST.LIMIT_MAX;

var mock_factor_minmax = {
    none: {
        rule: null,
        data: [3, 2, 2, 1, 8],
        rslt: { min: 1, max: 8 }
    },
    min1: {
        rule: { 0: MIN },
        data: [undefined, 2, 4, 8, 6],
        rslt: { min: 0, max: 8 }
    },
    min2: {
        rule: { 0: MIN },
        data: [undefined, 0, 2, 4],
        rslt: { min: 0, max: 4 }
    },
    min3: {
        rule: { 0: MIN },
        data: [undefined, 4],
        rslt: { min: 0, max: 4}
    },
    max1: {
        rule: { 2: MAX, 4: MAX },
        data: [6, 3, undefined, 9, undefined],
        rslt: { min: 3, max: 12 }
    },
    max2: {
        rule: { 1: MAX },
        data: [3, undefined],
        rslt: { min: 3, max: 6 }
    },
    del1: {
        rule: { 3: DEL },
        data: [3, 2, 4, undefined, 6],
        rslt: { min: 2, max: 6 }
    },
    del2: {
        rule: { 3: DEL },
        data: [3, 3, 3, undefined],
        rslt: {min: 3, max: 3}
    },
    com1: {
        rule: { 2: MIN, 4: MAX },
        data: [6, 12, undefined, 9, undefined],
        rslt: { min: 3, max: 15 }
    },
    com2: {
        rule: { 0: MIN, 3: MAX },
        data: [undefined, 3, 3, undefined],
        rslt: {min: 0, max: 6}
    },
    com3: {
        rule: { 0: DEL, 2: MIN, 3: MAX },
        data: [undefined, 4, undefined, undefined, 6],
        rslt: { min: 2, max: 8 }
    },
    all1: {
        rule: { 0: MAX, 1: MIN, 2: DEL, 3: MIN, 4: MAX },
        data: [undefined, undefined, undefined, undefined, undefined],
        rslt: { min: LMIN, max: LMAX }
    }
};

module.exports = mock_factor_minmax;
