var expect = require('expect.js');
var Factor = require('../../lib/factor.js');
var rAnk = process.env.COVERAGE ?
    require('../../lib-cov/rAnk.js') :
    require('../../lib/rAnk.js');

describe('rAnk', function() {

    describe('factor', function() {

        var desc1 = {
            name: 'test1',
            exec: function() {}
        };
        var desc2 = {
            name: 'test2',
            exec: function() {}
        };

        beforeEach(function() {
            rAnk._factor = {};
        });

        describe('by factor', function() {

            it('should return factor by factor', function() {
                expect(rAnk.factor(new Factor(desc1))).to.be.eql(new Factor(desc1));
            });

            it('shoult cache factor by factor', function() {
                rAnk.factor(new Factor(desc1));
                expect(rAnk._factor).to.be.eql({test1: new Factor(desc1)});
            });

            it('should return array of factors by array of factors', function() {
                expect(rAnk.factor([new Factor(desc1), new Factor(desc2)])).to.be.eql([new Factor(desc1), new Factor(desc2)]);
            });

            it('should cache array of factors by array of factors', function() {
                rAnk.factor([new Factor(desc1), new Factor(desc2)]);
                expect(rAnk._factor).to.be.eql({'test1': new Factor(desc1), 'test2': new Factor(desc2)});
            });

            it('should return array of factors by list of factors', function() {
                expect(rAnk.factor(new Factor(desc1), new Factor(desc2))).to.be.eql([new Factor(desc1), new Factor(desc2)]);
            });

            it('should cache array of factors by list of factors', function() {
                rAnk.factor(new Factor(desc1), new Factor(desc2));
                expect(rAnk._factor).to.be.eql({'test1': new Factor(desc1), 'test2': new Factor(desc2)});
            });

        });

        describe('by description', function() {

            it('should return factor by descrition', function() {
                expect(rAnk.factor(desc1)).to.be.a(Factor);
            });

            it('shoult cache factor by description', function() {
                rAnk.factor(desc1);
                expect(rAnk._factor).to.be.eql({test1: new Factor(desc1)});
            });

            it('should return array of factors by array of descriptions', function() {
                expect(rAnk.factor([desc1, desc2])).to.be.eql([new Factor(desc1), new Factor(desc2)]);
            });

            it('should cache array of factors by array of descriptions', function() {
                rAnk.factor([desc1, desc2]);
                expect(rAnk._factor).to.be.eql({'test1': new Factor(desc1), 'test2': new Factor(desc2)});
            });

            it('should return array of factors by list of descriptions', function() {
                expect(rAnk.factor(desc1, desc2)).to.be.eql([new Factor(desc1), new Factor(desc2)]);
            });

            it('should cache array of factors by list of descriptions', function() {
                rAnk.factor(desc1, desc2);
                expect(rAnk._factor).to.be.eql({'test1': new Factor(desc1), 'test2': new Factor(desc2)});
            });

        });

        describe('by filename', function() {

            it('should return factor by description file', function() {
                expect(rAnk.factor('./test/fixtures/rAnk.factors.1.js').name).to.be('fix1');
            });

            it('should return array of factors by array description file', function() {
                var factors = rAnk.factor('./test/fixtures/rAnk.factors.2.js');
                expect(factors[0].name).to.be('fix2');
                expect(factors[1].name).to.be('fix3');
            });

        });

        describe('by name', function() {

            beforeEach(function() {
                rAnk.factor(new Factor(desc1), new Factor(desc2));
            });

            it('should return factor by name', function() {
                expect(rAnk.factor('test1')).to.be.eql(new Factor(desc1));
            });

            it('should return array of factors by array of names', function() {
                expect(rAnk.factor(['test1', 'test2'])).to.be.eql([new Factor(desc1), new Factor(desc2)]);
            });

            it('should return array of factors by list of names', function() {
                expect(rAnk.factor('test1', 'test2')).to.be.eql([new Factor(desc1), new Factor(desc2)]);
            });

        });

    });

    describe('formula', function() {

        it('should add formula', function() {
            rAnk.formula('some1', [{}, {}])
            expect(rAnk._formula.some1).to.be.ok();
        });

    });

    describe('run', function() {

        beforeEach(function() {
            var simpleSort = {run: function(data) { return data.sort(); }};
            rAnk.formula('some', [
                { run: function(data) { return data.sort(); } },
                { run: function(data) { return data.sort().reverse(); } }
            ]);
        });

        it('should run formula', function() {
            rAnk.run('some', [2,1,3], {}).then(function(data) {
                expect(data.result).to.eql([2,1,3]);
                expect(data.stat).to.eql([[ 1, 1 ], [ 2, 0 ], [ 0, 2 ]]);
            });
        });

        it('should run formula with weights', function() {
            rAnk.run('some', [2,1,3], {}, [1, 0.5]).then(function(data) {
                expect(data.result).to.eql([1,2,3]);
                expect(data.stat).to.eql([[ 2, 0 ], [ 1, 1 ], [ 0, 2 ]]);
            });
        });

    });

});
