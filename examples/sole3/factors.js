
module.exports = [
    {
        name: '2*x + 3*y - z = 5',
        type: F_BINARY,
        run: function(data) {
            return data.map(function(item) {
                return 2*item[0] + 3*item[1] - item[2] === 5;
            });
        }
    },
    {
        name: 'x - y + z = 2',
        type: F_BINARY,
        run: function(data) {
            return data.map(function(item) {
                return item[0] - item[1] + item[2] === 2;
            });
        }
    },
    {
        name: '3*x - y + 2*z = 7',
        type: F_BINARY,
        run: function(data) {
            return data.map(function(item) {
                return 3*item[0] - item[1] + 2*item[2] === 7;
            });
        }
    }
];
