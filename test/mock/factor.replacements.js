var CONST = require('../../lib/factor').CONST;

var MIN = CONST.REPLACER_MIN;
var MAX = CONST.REPLACER_MAX;
var DEL = CONST.REPLACER_DEL;

var replacer = {};
replacer[MIN] = 7;
replacer[MAX] = 8;
replacer[DEL] = -1;

module.exports = {
    replacer: replacer,
    min: {
        rule: { 0: MIN },
        data: [3, 2, 4, 9, 6],
        pass: [   2, 4, 9, 6],
        rslt: [7, 2, 4, 9, 6]
    },
    max: {
        rule: { 2: MAX, 4: MAX },
        data: [3, 2, 4, 9, 6],
        pass: [3, 2,    9   ],
        rslt: [3, 2, 8, 9, 8]
    },
    del: {
        rule: { 3: DEL },
        data: [3, 2, 4, 9, 6],
        pass: [3, 2, 4, 6   ],
        rslt: [3, 2, 4,-1, 6]
    },
    com: {
        rule: { 0: DEL, 2: MIN, 3: MAX },
        data: [3, 2, 4, 9, 6],
        pass: [   2,       6],
        rslt:[-1, 2, 7, 8, 6]
    },
    all: {
        rule: { 0: MAX, 1: MIN, 2: DEL, 3: MIN, 4: MAX },
        data: [3, 2, 4, 9, 6],
        pass: [             ],
        rslt: [8, 7,-1, 7, 8]
    }
};
