var mock_rank_load = {
    one: {
        result: {
            data: [1, 2, 3, 4],
            stat: [
                [1, 1, 1],
                [0.7, 0.7, 0.7],
                [0.5, 0.5, 0.5],
                [0, 0, 0]
            ],
            weight: [1, 1, 1]
        },
        wght: [0.5, 0.5, 0.5],
        rslt: [1, 2, 3, 4]
    },
    two: {
        result: {
            data: [1, 2, 3],
            stat: [
                [1, 0, 0.5],
                [0.5, 1, 0 ],
                [0, 0.5, 1]
            ]
        },
        wght: [0.5, 1, 1],
        rslt: [3, 2, 1]
    }
};
module.exports = mock_rank_load;
