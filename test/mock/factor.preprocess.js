var CONST = require('../../lib/const');

var NTR = CONST.REPLACER_NTR;
var DEL = CONST.REPLACER_DEL;

var D = CONST.VALUE_DEL;
var N = CONST.VALUE_NTR;

var mock_factor_preprocess = {
    spur1: {
        rule: null,
        data: [3, 2, 2, 0, 8],
        vals: [3, 2, 2, 0, 8],
        rslt: { spur: {min: 0, max: 8}, fine: {} }
    },
    spur2: {
        rule: null,
        data: [undefined, 2, 4, 8, 6],
        vals: [N, 2, 4, 8, 6],
        rslt: { spur: {min: 2, max: 8}, fine: {} }
    },
    spur3: {
        rule: null,
        data: [undefined, 4],
        vals: [N, 4],
        rslt: { spur: {min: 4, max: 4}, fine: {} }
    },
    spur4: {
        rule: null,
        data: [6, 3, undefined, 9, undefined],
        vals: [6, 3, N, 9, N],
        rslt: { spur: {min: 3, max: 9}, fine: {} }
    },
    spur5: {
        rule: null,
        data: [6, null, function(){}, 'abc', 3],
        vals: [6, N, N, N, 3],
        rslt: { spur: {min: 3, max: 6}, fine: {} }
    },
    fine1: {
        rule: null,
        data: [-5, -3, -2, -1],
        vals: [-5, -3, -2, -1],
        rslt: { spur: {}, fine: {min: -1, max: -5} }
    },
    fine2: {
        rule: null,
        data: [undefined, -3, -2, -1],
        vals: [N, -3, -2, -1],
        rslt: { spur: {}, fine: {min: -1, max: -3} }
    },
    fine3: {
        rule: null,
        data: [undefined, undefined, -2],
        vals: [N, N, -2],
        rslt: { spur: {}, fine: {min: -2, max: -2} }
    },
    com1: {
        rule: null,
        data: [3, -1, 5, -3, 2, 2, -4],
        vals: [3, -1, 5, -3, 2, 2, -4],
        rslt: { spur: {min: 2, max: 5}, fine: {min: -1, max: -4} }
    },
    com2: {
        rule: null,
        data: [3, -1, 5, -3, 2, undefined, -4],
        vals: [3, -1, 5, -3, 2, N, -4],
        rslt: { spur: {min: 2, max: 5}, fine: {min: -1, max: -4} }
    },
    com3: {
        rule: null,
        data: [undefined, -1, undefined, undefined, undefined, 2],
        vals: [N, -1, N, N, N, 2],
        rslt: { spur: {min: 2, max: 2}, fine: {min: -1, max: -1} }
    },
    com4: {
        rule: null,
        data: [],
        vals: [],
        rslt: { spur: {}, fine: {} }
    },
    com5: {
        rule: null,
        data: [undefined],
        vals: [N],
        rslt: { spur: {}, fine: {} }
    },
    del1: {
        rule: { 3: DEL },
        data: [3, 2, -4, undefined, 6],
        vals: [3, 2, -4, D, 6],
        rslt: { spur: {min: 2, max: 6}, fine: {min: -4, max: -4} }
    },
    del2: {
        rule: { 3: DEL },
        data: [3, 3, undefined, undefined],
        vals: [3, 3, N, D],
        rslt: { spur: {min: 3, max: 3}, fine: {} }
    },
    ntr1: {
        rule: { 2: NTR },
        data: [3, 2, undefined, 4],
        vals: [3, 2, N, 4],
        rslt: { spur: {min: 2, max: 4}, fine: {} }
    },
    ntr2: {
        rule: { 2: NTR },
        data: [-3, -3, undefined, -3],
        vals: [-3, -3, N, -3],
        rslt: { spur: {}, fine: {min: -3, max: -3} }
    },
    all1: {
        rule: { 1: DEL, 6: NTR },
        data: [4, undefined, 8, undefined, undefined, 6, undefined],
        vals: [4, D, 8, N, N, 6, N],
        rslt: { spur: {min: 4, max: 8}, fine: {}}
    },
    all2: {
        rule: { 0:NTR, 2: DEL },
        data: [undefined, undefined, undefined, undefined, undefined],
        vals: [N, N, D, N, N],
        rslt: { spur: {}, fine: {} }
    }
};

module.exports = mock_factor_preprocess;
