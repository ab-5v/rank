var expect = require('expect.js');

var math = process.env.COVERAGE ?
    require('../../lib-cov/math.js') :
    require('../../lib/math.js');

describe('math', function() {

    describe('min', function() {

        it('should return min from array', function() {
            expect(math.min([3,2,4,5,1,3,5,2])).to.be(1);
        });

    });

    describe('max', function() {

        it('should return max from array', function() {
            expect(math.max([3,2,4,5,1,3,5,2])).to.be(5);
        });

    });

    describe('sum', function() {

        it('should return sum of array', function() {
            expect(math.sum([3,4,1,3,4,3])).to.be(18);
        });

        it('should return 0 on empty array', function() {
            expect(math.sum([])).to.be(0);
        });

    });

    describe('mean', function() {

        it('should return mean of array', function() {
            expect(math.mean([2,3,4,1,4,1])).to.be(2.5);
        });

        it('should return 0 on empty array', function() {
            expect(math.mean([])).to.be(0);
        });

    });

    describe('mode', function() {

        it('should return mode of array', function() {
            expect(math.mode([2,3,4,1,4,3])).to.be(4);
        });

    });

    describe('median', function() {

        it('should return median of array', function() {
            expect(math.median([2,1,3,4,5])).to.be(3);
        });

        it('should return median of even array', function() {
            expect(math.median([4,2,1,3,4,5])).to.be(3.5);
        });

        it('should return 0 on empty array', function() {
            expect(math.median([])).to.be(0);
        });

    });

    describe('linear', function() {

        it('should return increasing function', function() {
            var f = math.linear(1,1,3,3);
            expect( f(2) ).to.be(2);
        });

        it('should return decreasing function', function() {
            var f = math.linear(3,3,1,1);
            expect( f(2) ).to.be(2);
        });

    });

    describe('cardinal', function() {

        it('should return cardinal of array', function() {
            expect( math.cardinal([1,2,3,1,2,3,3,4,5]) ).to.be(5);
        });

        it('should return 0 on empty array', function() {
            expect( math.cardinal([]) ).to.be(0);
        });

    });

    describe('variance', function() {

        it('should return variance of the array', function() {
            expect( math.variance([1, 3, 5, 7, 14]) ).to.be(20);
        });

    });

    describe('deviation', function() {

        it('should return standart deviation of the array', function() {
            expect( math.deviation([1, 3, 5, 7, 14]) ).to.be( Math.sqrt(20) );
        });

    });

    describe('step', function() {

        it('should return step of the even array', function() {
            expect( math.step([12, 8, 10, 14]) ).to.be(2);
        });

        it('should return 0 on empty array', function() {
            expect( math.step([]) ).to.be(0);
        });

        it('should retur 0 for array with one element', function() {
            expect( math.step([1]) ).to.be(0);
        });

    });

});
