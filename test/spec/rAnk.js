var expect = require('expect.js');
var Factor = require('../../lib/factor.js');
var rAnk = process.env.COVERAGE ?
    require('../../lib-cov/rAnk.js') :
    require('../../lib/rAnk.js');

describe('rAnk', function() {

    describe('config', function() {

        var config = {
            name1: 'val1',
            name2: 'val2'
        };

        beforeEach(function() {
            rAnk._config = config;
        });

        it('should get config item', function() {
            expect( rAnk.config('name2') ).to.be('val2');
        });

        it('should set config item', function() {
            rAnk.config('name3', 'val3');
            expect( rAnk.config('name3') ).to.be('val3');
        });

        it('should overwrite config item', function() {
            rAnk.config('name2', 'valnew');
            expect( rAnk.config('name2') ).to.be('valnew');
        });

        it('should set config items with object', function() {
            rAnk.config({name2: 'valnew', name3: 'val3'});
            expect( rAnk.config('name1') ).to.be('val1');
            expect( rAnk.config('name2') ).to.be('valnew');
            expect( rAnk.config('name3') ).to.be('val3');
        });

    });

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

});
