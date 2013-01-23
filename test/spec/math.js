var expect = require('expect.js');

var math = process.env.COVERAGE ?
    require('../../lib-cov/math.js') :
    require('../../lib/math.js');

describe('math', function() {

    it('should return min from array', function() {
        expect(math.min([3,2,4,5,1,3,5,2])).to.be(1);
    });

    it('should return max from array', function() {
        expect(math.max([3,2,4,5,1,3,5,2])).to.be(5);
    });

    it('should return sum of array', function() {
        expect(math.sum([3,4,1,3,4,3])).to.be(18);
    });

    it('should return mean of array', function() {
        expect(math.mean([2,3,4,1,4,1])).to.be(2.5);
    });

    it('should return mode of array', function() {
        expect(math.mode([2,3,4,1,4,3])).to.be(4);
    });

    it('should return median of array', function() {
        expect(math.median([2,1,3,4,5])).to.be(3);
    });

    it('should return median of even array', function() {
        expect(math.median([4,2,1,3,4,5])).to.be(3.5);
    });

    it('should return increasing function', function() {
        var f = math.linear(1,1,3,3);
        expect( f(2) ).to.be(2);
    });

    it('should return decreasing function', function() {
        var f = math.linear(3,3,1,1);
        expect( f(2) ).to.be(2);
    });
});
