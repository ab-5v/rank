var expect = require('expect.js');
var vars = require('../../lib/vars.js');
var Factor = require('../../lib/factor.js');

var Formula = process.env.COVERAGE ?
    require('../../lib-cov/formula.js') :
    require('../../lib/formula.js');

describe('formula', function() {

    describe('constructor', function() {
        var fRank = [{type: vars.FACTORTYPE.RANK}, {type: vars.FACTORTYPE.RANK}];
        var fBina = [{type: vars.FACTORTYPE.BINARY}, {type: vars.FACTORTYPE.BINARY}];
        var fFilt = [{type: vars.FACTORTYPE.FILTER}, {type: vars.FACTORTYPE.FILTER}];

        it('should save factors', function() {
            var formula = new Formula([1,2,3]);
            expect(formula.factors).to.eql([1,2,3]);
        });

        it('should save weights', function() {
            var formula = new Formula([1,2,3], [1,0,1]);
            expect(formula.weights).to.eql([1,0,1]);
        });

        it('should use default weights', function() {
            var formula = new Formula([1,2,3]);
            expect(formula.weights).to.eql([1,1,1]);
        });

    });

    describe('stat', function() {

        beforeEach(function() {
            this.formula = new Formula([]);
        });

        it('should return stat', function() {
            expect( this.formula.stat( [[1,2,3], [3,2,1], [-1,0,0], [3,0,3]] ) )
                .to.eql( [[1,3,-1,3], [2,2,0,0], [3,1,0,3]] );
        });

    });

    describe('exec', function() {

        it('should fit ranks in array', function() {
            var formula = new Formula([
                {exec: function() {return [1,2,3,0];} },
                {exec: function() {return [-1,0,0,-1];} },
                {exec: function() {return [0,3,3,0];} },
            ]);

            expect(formula.exec([], {})).to.eql([[1,2,3,0], [-1,0,0,-1], [0,3,3,0]]);
        });

    });

    describe('merge', function() {

        it('should summary all the ranks', function() {
            var formula = new Formula([{}, {}, {}]);
            expect(formula.merge([[1,2,3,0], [-1,0,0,-1], [0,3,3,0]]))
                .to.eql([-1,5,6,-1]);
        });

        it('should use weights', function() {
            var formula = new Formula([{},{},{}], [1, 0.5, 0]);

            expect(formula.merge([[-1, 0, -1, 0], [1, 2, 4, 5], [4, 6, 7, 8]]))
                .to.eql([-1, 1, -1, 2.5]);
        });

    });

    describe('compile', function() {

        it('should sort array of numbers according to the summary', function() {
            var formula = new Formula([]);

            expect(formula.compile([1,2,3,4], [-1,5,6,-1], [[1], [2], [3], [4]]))
                .to.eql({ result: [3,2], stat: [[3], [2]]});
        });

        it('should sort array of objects according to the summary', function() {
            var formula = new Formula([]);

            expect(formula.compile([{a:1},{a:2},{a:3},{a:4}], [-1,5,6,-1], [[1], [2], [3], [4]]))
                .to.eql({ result: [{a:3},{a:2}], stat: [[3], [2]]});
        });

        it('should return different values on equal weights', function() {
            var formula = new Formula([]);

            expect(formula.compile([1,2,3,4], [-1,5,5,-1], [[1], [2], [3], [4]]))
                .to.eql({ result: [2,3], stat: [[2], [3]] });
        });

    });
});
