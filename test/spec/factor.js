var vars = require('../../lib/vars.js');
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
            mock('lt5')
        ];

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
            this.factors[0].exec(this.dataPlain);
            expect(this.dataPlain).to.eql([4,0,2,1]);
        });

        it('TODO: could modify original data while filtering', function() {});
    });

    describe('distribution', function() {

        it('should properly distribute rank', function(done) {
            this.factors[0].exec(this.dataPlain).then(function(data) {
                expect(data).to.eql([0,3,1,2]);
                done();
            });
        });

        it('should properly distribute rank on objects', function(done) {
            this.factors[1].exec(this.dataObj).then(function(data) {
                expect(data).to.eql([0,3,1,2]);
                done();
            });
        });

        it('should append maximum rank to binary trues', function(done) {
            this.factors[2].exec(this.dataPlain).then(function(data) {
                expect(data).to.eql([0,0,0,3]);
                done();
            });
        });

        it('should pass by filters', function(done) {
            this.factors[3].exec(this.dataPlain).then(function(data) {
                expect(data).to.eql([0,-1,-1,-1]);
                done();
            });
        });

        it('should return [] when nothing were filtered', function(done) {
            this.factors[4].exec(this.dataPlain).then(function(data) {
                expect(data).to.eql([]);
                done();
            });
        });

    });

});
