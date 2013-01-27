require('../../lib/vars');

var expect = require('expect.js');

var Factor = process.env.COVERAGE ?
    require('../../lib-cov/factor.js') :
    require('../../lib/factor.js');

var mock = require('../mock/factor');

describe('factor', function() {

    beforeEach(function() {

        this.dataPlain = [4,0,2,1];
        this.dataObj = [{i:4}, {i:0}, {i:2}, {i:1}];
        this.factors = [
            mock('sort plain'),
            mock('sort obj'),
            mock('only odd'),
            mock('gt3'),
            mock('lt5'),
            mock('minmaxSimple'),
            mock('minmaxObjI'),
            mock('maxminSimple'),
        ];

    });

    describe('constructor', function() {

        it('should set defaults', function() {
            var factor = new Factor({run: function() {}});
            expect(factor.type).to.be(F_SORT);
            expect(factor.run).to.be.a(Function);
            expect(factor.key).to.be.a(Function);
        });

        it('should overwrite defaults', function() {
            var key = function() {};
            var run = function() {};

            var factor = new Factor({
                type: F_BINARY,
                run: run,
                key: key
            });

            expect(factor.type).to.be(F_BINARY);
            expect(factor.run).to.be(run);
            expect(factor.key).to.be(key);
        });

        it('should throw on empty run', function() {
            var factor = new Factor({});
            expect(function() { factor.exec(); }).to.throwError();
        });

    });

    describe('exec', function() {

        it('should not modify original data while ranking', function() {
            this.factors[0].exec(this.dataPlain);
            expect(this.dataPlain).to.eql([4,0,2,1]);
        });

        it('TODO: could modify original data while filtering', function() {});
    });

    describe('constants', function() {

        it('should replace consts with values', function() {
            var factor = new Factor({});

            expect( factor.constants([4, factor.minValue, factor.maxValue, 6, 8, factor.minValue], {min: 1, max: 2}) )
                .to.eql([4, 2, 10, 6, 8, 2]);
        });

        it('should replace consts to limits in array of consts only', function() {
            var factor = new Factor({});

            expect( factor.constants([factor.minValue, factor.maxValue, factor.minValue], {min: 1, max: 10}) )
                .to.eql([1, 10, 1]);
        });

    });

    describe('distribution', function() {

        it('should properly distribute sort', function() {
            var data = this.dataPlain;
            var factor = this.factors[0];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 10}, data, sorting) )
                    .to.eql( [1, 10, 4, 7] );
            });
        });

        it('should properly distribute sort on objects', function() {
            var data = this.dataObj;
            var factor = this.factors[1];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 4}, data, sorting) )
                    .to.eql( [1, 4, 2, 3] );
            });
        });

        it('should append maximum rank to binary trues', function() {
            var data = this.dataPlain;
            var factor = this.factors[2];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 10}, data, sorting) )
                    .to.eql( [0, 0, 0, 10] );
            });
        });

        it('should pass by filters', function() {
            var data = this.dataPlain;
            var factor = this.factors[3];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 4}, data, sorting) )
                    .to.eql( [0, -1, -1, -1] );
            });
        });

        it('should return [] when nothing were filtered', function() {
            var data = this.dataPlain;
            var factor = this.factors[4];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 4}, data, sorting) )
                    .to.eql( [] );
            });
        });

        it('should distribute simple minmax', function() {
            var data = this.dataPlain;
            var factor = this.factors[5];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 4}, data, sorting) )
                    .to.eql( [ 4, 1, 2.5, 1.75 ] );
            });
        });

        it('should distribute simple maxmin', function() {
            var data = this.dataPlain;
            var factor = this.factors[7];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 4}, data, sorting) )
                    .to.eql( [ 1, 4, 2.5, 3.25 ] );
            });
        });

        it('should distribute minmax with constatnts', function() {
            var factor = this.factors[5];
            var data = [12, 8, factor.minValue, factor.maxValue, 10, factor.minValue];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 6, max: 14}, data, sorting) )
                    .to.eql( [ 12, 8, 6, 14, 10, 6 ] );
            });
        });

        it('should distribute maxmin with constatnts', function() {
            var factor = this.factors[7];
            var data = [12, 8, factor.minValue, factor.maxValue, 10, factor.minValue];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 6, max: 14}, data, sorting) )
                    .to.eql( [ 8, 12, 14, 6, 10, 14 ] );
            });
        });

        it('should distribute minmax to 0-s on the equal values array', function() {
            var data = [1, 1, 1, 1, 1, 1];
            var factor = this.factors[5];

            factor.exec( data ).then(function(sorting) {

                expect( factor.distribution({min: 1, max: 4}, data, sorting) )
                    .to.eql( [ 0, 0, 0, 0, 0, 0 ] );
            });
        });
    });

});
