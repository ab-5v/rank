
module.exports = [
    {
        name: '2*x + 3*y - z = 5',
        value: function(item) {
            return 2*item[0] + 3*item[1] - item[2] === 5 ? 1 : 0;
        }
    },
    {
        name: 'x - y + z = 2',
        value: function(item) {
            return item[0] - item[1] + item[2] === 2 ? 1 : 0;
        }
    },
    {
        name: '3*x - y + 2*z = 7',
        value: function(item) {
            return 3*item[0] - item[1] + 2*item[2] === 7 ? 1 : 0;
        }
    }
];
