var vars = require('../../lib/vars.js');
var expect = require('expect.js');

var Factor = process.env.COVERAGE ?
    require('../../lib-cov/factor.js') :
    require('../../lib/factor.js');

describe('factor', function() {

    beforeEach(function() {

        this.dataPlain = [4,0,2,1];
        this.dataObj = [{i:4}, {i:0}, {i:2}, {i:1}];

        this.sortFactorPlain = new Factor({
            name: 'sort plain',
            run: function(data) {
                return data.sort();
            }
        });

        this.sortFactorObj = new Factor({
            name: 'sort obj',
            key: function(item) {
                return item.i;
            },
            run: function(data) {
                return data.sort(function(a, b) {
                    return a.i - b.i;
                })
            }
        });

        this.oddFactorPlain = new Factor({
            name: 'only odd',
            type: vars.FACTORTYPE.BINARY,
            run: function(data) {
                return data.map(function(item) {
                    return item % 2 ? true : false;
                });
            }
        });

        this.gt3FactorPlain = new Factor({
            name: 'only odd',
            type: vars.FACTORTYPE.FILTER,
            run: function(data) {
                return data.filter(function(item) {
                    return item > 3;
                });
            }
        });

        this.lt5FactorPlain = new Factor({
            name: 'only odd',
            type: vars.FACTORTYPE.FILTER,
            run: function(data) {
                return data.filter(function(item) {
                    return item < 5;
                });
            }
        });
    });

    describe('constructor', function() {

        it('should set defaults', function() {
            var factor = new Factor({run: function() {}});
            expect(factor.type).to.be(vars.FACTORTYPE.RANK);
            expect(factor.run).to.be.a(Function);
            expect(factor.key).to.be.a(Function);
        });

        it('should overwrite defaults', function() {
            var key = function() {};
            var run = function() {};

            var factor = new Factor({
                type: vars.FACTORTYPE.BINARY,
                run: run,
                key: key
            });

            expect(factor.type).to.be(vars.FACTORTYPE.BINARY);
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
            this.sortFactorPlain.exec(this.dataPlain);
            expect(this.dataPlain).to.eql([4,0,2,1]);
        });

        it('TODO: could modify original data while filtering', function() {});
    });

    describe('distribution', function() {

        it('should properly distribute rank', function() {
            expect(this.sortFactorPlain.exec(this.dataPlain)).to.eql([0,3,1,2]);
        });

        it('should properly distribute rank on objects', function() {
            expect(this.sortFactorObj.exec(this.dataObj)).to.eql([0,3,1,2]);
        });

        it('should append maximum rank to binary trues', function() {
            expect(this.oddFactorPlain.exec(this.dataPlain)).to.eql([0,0,0,3]);
        });

        it('should pass by filters', function() {
            expect(this.gt3FactorPlain.exec(this.dataPlain)).to.eql([0, -1, -1, -1]);
        });

        it('should return [] when nothing were filtered', function() {
            expect(this.lt5FactorPlain.exec(this.dataPlain)).to.eql([]);
        });

    });

});
