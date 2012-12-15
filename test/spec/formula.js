var expect = require('expect.js');
var vars = require('../../lib/vars.js');
var Formula = require('../../lib/formula');


describe('formula', function() {

    describe('constructor', function() {
        var fRank = [{type: vars.FACTORTYPE.RANK}, {type: vars.FACTORTYPE.RANK}];
        var fBina = [{type: vars.FACTORTYPE.BINARY}, {type: vars.FACTORTYPE.BINARY}];
        var fFilt = [{type: vars.FACTORTYPE.FILTER}, {type: vars.FACTORTYPE.FILTER}];

        it('should initialize properties', function() {
            var formula = new Formula();
            expect(formula.factors.filter).to.eql([]);
            expect(formula.factors.binary).to.eql([]);
            expect(formula.factors.rank).to.eql([]);
        });

        it('should add filtering factors', function() {
            var formula = new Formula(fFilt);
            expect(formula.factors.filter).to.eql(fFilt);
            expect(formula.factors.binary).to.eql([]);
            expect(formula.factors.rank).to.eql([]);
        });

        it('should add ranking factors', function() {
            var formula = new Formula(fRank);
            expect(formula.factors.filter).to.eql([]);
            expect(formula.factors.binary).to.eql([]);
            expect(formula.factors.rank).to.eql(fRank);
        });

        it('should add binary factors', function() {
            var formula = new Formula(fBina);
            expect(formula.factors.filter).to.eql([]);
            expect(formula.factors.binary).to.eql(fBina);
            expect(formula.factors.rank).to.eql([]);
        });

        it('should add all factors', function() {
            var formula = new Formula([].concat(fRank, fBina, fFilt));
            expect(formula.factors.filter).to.eql(fFilt);
            expect(formula.factors.binary).to.eql(fBina);
            expect(formula.factors.rank).to.eql(fRank);
        });

    });

});
