var mock_rank_run = {
    'one simple factor': {
        data: [1, 2, 3],
        factors: [
            { value: function(val) { return val % 2; } }
        ],
        result: [1, 3, 2]
    },

    'many simple factors': {
        data: [1, 2, 3, 4, 5],
        factors: [
            { value: function(val) { return val % 3; } },
            { value: function(val) { return val === 2 ? 6 : 1; } }
        ],
        result: [ 2, 5, 1, 4, 3 ]
    },

    'one isAll factor': {
        data: [1, 2, 3, 4],
        factors: [
            { valueAll: function(data) { return [1, 2, 3, 4]; } }
        ],
        result: [4, 3, 2, 1]
    },

    'many isAll factors': {
        data: [2, 4, 6, 8],
        factors: [
            { valueAll: function(data) { return [90, 50, 70, 80]; } },
            { valueAll: function(data) { return [1, 2, 6, 9]; } }
        ],
        result: [8, 6, 2, 4]
    },

    'combined factors': {
        data: [3, 6, 9, 0],
        factors: [
            { value: function(val) { return val * 10;  } },
            { value: function(val) { return val % 2; } },
            { valueAll: function(val) { return [4, 3, 2, 1]; }, invert: true },
            { valueAll: function(val) { return [1, 1, 0, 0]; } }
        ],
        result: [9, 3, 6, 0]
    },

    'simple factors with consts': {
        data: [3, 2, 9, 0],
        factors: [
            { value: function(val) { return val === 3 ? this.removeItem() : 1; } },
            { value: function(val) { return val; } }
        ],
        result: [9, 2, 0]
    },

    'isAll factors with consts': {
        data: [1, 3, 4, 0],
        factors: [
            {valueAll: function(data) { return [1, 2, 1, this.neutralValue(3)]; } },
            {valueAll: function(data) { return [1, this.removeItem(1), this.neutralValue(2), 5]; } }
        ],
        result: [0, 1, 4]
    },

    'combined factors on objects': {
        data: [{a: 1}, {a: 7}, {a: 8}],
        factors: [
            { value: function(item) { return item.a; } },
            { valueAll: function() { return [1, 0, 1]; }, invert: true }
        ],
        result: [{a: 7}, {a: 8}, {a: 1}]
    },

    'combined factors with conditions': {
        data: [1, 4, 9, 2],
        conditions: {a: 10},
        factors: [
            { value: function(val, cond) { cond.a = cond.a * val; return val; } },
            { valueAll: function(data, cond) { return [cond.a % 1, cond.a % 4, cond.a % 9, cond.a % 2]; } }
        ],
        result: [9, 4, 2, 1]
    },

    'combined factors with weights': {
        data: [1, 7, 5, 9],
        weights: [1, 0.6],
        factors: [
            { value: function(val) { return val; } },
            { valueAll: function(data) { return [9, 9, 1, 1]; } }
        ],
        result: [7, 9, 1, 5]
    }
};

module.exports = mock_rank_run;
