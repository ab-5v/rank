var sinon = require('sinon');
var expect = require('expect.js');

var factor = require('../../lib/factor.js');

var formula = process.env.COVERAGE ?
    require('../../lib-cov/formula.js') :
    require('../../lib/formula.js');

describe('formula', function() {

    beforeEach(function() {

        var data = this.data = [1, 2, 3];

        this.f1 = factor({id: 'f1', value: function() {}});
        this.f2 = factor({id: 'f2', value: function() {}});
        this.f3 = factor({id: 'f3', valueAll: function() { return data; }});

        sinon.spy(this.f1, 'append');
        sinon.spy(this.f2, 'append');
        sinon.spy(this.f3, 'append');

        this.formula = formula([this.f1, this.f2, this.f3]);

        sinon.spy(this.formula, 'exec');
        sinon.spy(this.formula, 'compile');
    });


    describe('_create', function() {

        it('should save factors to `_factors`', function() {
            expect( this.formula._factors ).to.eql( [this.f1, this.f2, this.f3] );
        });

        it('should save all simple factors to `_simples`', function() {
            expect( this.formula._simples ).to.eql( [this.f1, this.f2] );
        });

        it('should create array `_weights` with length of factors.length', function() {
            expect( this.formula._weights.length ).to.be.eql( 3 );
        });

    });

    describe('weight', function() {

        it('should fill with "1" by default on undefiend', function() {
            expect( this.formula.weight() ).to.eql( [1, 1, 1] );
        });

        it('should fill with "1" by default on empty array', function() {
            expect( this.formula.weight([]) ).to.eql([1, 1, 1]);
        });

        it('should append "1" when weights.length < factors.length', function() {
            expect( this.formula.weight([2, 3]) ).to.eql( [2, 3, 1] );
        });

        it('should cut when weights.length > factors.length', function() {
            expect( this.formula.weight([2, 3, 4, 5]) ).to.eql( [2, 3, 4] );
        });

    });

    describe('exec', function() {

        it('should return array of results for all factors', function() {
            var results = this.formula.exec(this.data, {});

            expect( results.length ).to.eql(3);
        });


    });

    describe('compile', function() {

        var mock_formula_compile = require('../mock/formula.compile.js');

        Object.keys(mock_formula_compile).forEach(function(key) {
            var set = mock_formula_compile[key];

            it('should compile set "' + key + '"', function() {
                this.formula._data = set.data;
                this.formula._weights = set.wght;
                set.rslt.factor = ['f1', 'f2', 'f3'];

                expect( this.formula.compile( set.mark ) ).to.eql( set.rslt );
            });
        });

    });

    describe('run', function() {

        it('should call "append" on each simple factor', function() {
            this.formula.run(this.data, {});

            expect( this.f1.append.called ).to.be.ok();
            expect( this.f2.append.called ).to.be.ok();
        });

        it('should iterate through all data and call "append" with index, item and cond', function() {
            var cond = {a: 1};
            this.formula.run(this.data, cond);
            var args = this.f1.append.args;

            expect( args[0] ).to.eql( [0, 1, cond] );
            expect( args[1] ).to.eql( [1, 2, cond] );
            expect( args[2] ).to.eql( [2, 3, cond] );
        });

        it('should not call "append" on "isAll" factors', function() {
            this.formula.run(this.data, {});

            expect( this.f3.append.called ).not.to.be.ok();
        });

        it('should call "exec" and "compile"', function(done) {
            this.formula.run(this.data, {});

            setTimeout(function() {
                expect( this.formula.exec.called ).to.be.ok();
                expect( this.formula.compile.called ).to.be.ok();
                done();
            }.bind(this), 20);
        });

    });

});
