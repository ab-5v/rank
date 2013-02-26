module.exports = {
    'empty': {
        data: [],
        wght: [],
        mark: [],
        rslt: {
            stat: [],
            result: [],
            weight: []
        }
    },

    'one data, one factor': {
        data: [1],
        wght: [1],
        mark: [[10]],
        rslt: {
            stat: [[10]],
            result: [1],
            weight: [1]
        }
    },

    'many data, one factor': {
        data: [1, 2, 3],
        wght: [1],
        mark: [[2, 2, 3]],
        rslt: {
            stat: [[3], [2], [2]],
            result: [3, 1, 2],
            weight: [1]
        }
    },

    'many data, many factor': {
        data: [1, 2, 3],
        wght: [1, 1],
        mark: [[2, 2, 3], [2, 4, 1]],
        rslt: {
            stat: [[2, 4], [2, 2], [3, 1]],
            result: [2, 1, 3],
            weight: [1, 1]
        }
    },

    'many, many, weight': {
        data: [1, 2, 3],
        wght: [1, 0.5],
        mark: [[2, 2, 4], [4, 4, 1]],
        rslt: {
            stat: [[4, 1], [2, 4], [2, 4]],
            result: [3, 1, 2],
            weight: [1, 0.5]
        }
    },

    'many, many, del': {
        data: [1, 2, 3],
        wght: [1, 1],
        mark: [[2, 2, 1], [1, -1, 3]],
        rslt: {
            stat: [[1, 3], [2, 1]],
            result: [3, 1],
            weight: [1, 1]
        }
    }
};
