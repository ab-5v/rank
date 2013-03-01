var sinon = require('sinon');
var expect = require('expect.js');

var pzero = require('p0');

var factor = process.env.COVERAGE ?
    require('../../lib-cov/factor.js') :
    require('../../lib/factor.js');

var CONST = require('../../lib/const');

describe('factor', function() {

    describe('_create', function() {

        beforeEach(function() {
            this.one = factor({id: 'factor-one', value: function() {}});
            this.all = factor({valueAll: function() {}});
            this.copy1 = factor({valueAll: function() { return []; }});
            this.copy2 = factor({valueAll: function() { return []; }});
        });

        it('should initialize `_values` property', function() {
            expect( this.one._values ).to.eql([]);
        });

        it('should set `isAll` to false for value factors', function() {
            expect( this.one.isAll ).to.eql(false);
        });

        it('should set `isAll` to true for valueAll factors', function() {
            expect( this.all.isAll ).to.eql(true);
        });

        it('should overwrite `id` property', function() {
            expect( this.one.id ).to.eql('factor-one');
        });

        it('should generate `id` when one not passed', function() {
            expect( this.all.id ).to.eql('bc027384201cc6270287b99364fb5e42');
        });

        it('should generate the same `id` for the similar description', function() {
            expect( this.copy1.id ).to.eql( this.copy2.id );
        });

        it('should generate different `id`s for different descriptions', function() {
            expect( this.copy1.id ).not.to.eql( this.all.id );
        });

        it('should be able to overwrite common properties', function() {
            var f = factor({value: 1, valueAll: 2, invert: 3});
            expect( [f.value, f.valueAll, f.invert] ).to.eql([1, 2, 3]);
        });

        it('should throw when do description passed', function() {
            expect( function() { factor(); } ).to.throwException(/should define/);
        });

        it('should throw when no `value` or `valueAll` passed', function() {
            expect( function() { factor({}); } ).to.throwException(/should define/);
        });

        it('should throw when call not owerwritten `value`', function() {
            expect( function() { this.all.value(); }.bind(this) ).to.throwException(/Method value must be overwritten/);
        });

        it('should throw when call not owerwritten `valueAll`', function() {
            expect( function() { this.one.valueAll(); }.bind(this) ).to.throwException(/Method valueAll must be overwritten/);
        });

    });

    describe('_replacements', function() {

        beforeEach(function() {
            this.one = factor({value: function() {}});

            sinon.spy(this.one, 'replacement');
        });

        it('should be `null` on factor creation', function() {
            expect( this.one._replacements ).to.eql( null );
        });

        describe('replacement', function() {

            it('should create `_relpacements` on first call', function() {
                this.one.replacement(0,0);

                expect( this.one._replacements ).to.eql( {0: 0} );
            });

            it('should not overwrite `_replacements` on other calls', function() {
                this.one.replacement(0, 1);
                this.one.replacement(1, 2);

                expect( this.one._replacements ).to.eql( {0: 1, 1: 2} );
            });

        });

        describe('minValue', function() {

            it('should call `replacement` method', function() {
                this.one.minValue(1, 0);

                expect( this.one.replacement.called ).to.be.ok();
            });

            it('should save minValue index in `_replacements` for given index', function() {
                this.one.minValue(20);

                expect( this.one._replacements[20] ).to.eql(CONST.REPLACER_MIN);
            });

            it('should save minValue index in `_replacements` for current index', function() {
                this.one._index = 10;
                this.one.minValue();

                expect( this.one._replacements[10] ).to.eql(CONST.REPLACER_MIN);
            });

            it('should save minValue index in `_replacements` for given index', function() {
                this.one.maxValue(20);

                expect( this.one._replacements[20] ).to.eql(CONST.REPLACER_MAX);
            });
        });


        describe('maxValue', function() {

            it('should call `replacement` method', function() {
                this.one.minValue(1, 0);

                expect( this.one.replacement.called ).to.be.ok();
            });

            it('should save maxValue index in `_replacements` for current index', function() {
                this.one._index = 10;
                this.one.maxValue();

                expect( this.one._replacements[10] ).to.eql(CONST.REPLACER_MAX);
            });
        });

        describe('removeItem', function() {
            it('should call `replacement` method', function() {
                this.one.minValue(1, 0);

                expect( this.one.replacement.called ).to.be.ok();
            });

            it('should save removedIted index in `_replacements` for given index', function() {
                this.one.removeItem(20);

                expect( this.one._replacements[20] ).to.eql(CONST.REPLACER_DEL);
            });

            it('should save removedItem index in `_replacements` for current index', function() {
                this.one._index = 10;
                this.one.removeItem();

                expect( this.one._replacements[10] ).to.eql(CONST.REPLACER_DEL);
            });

        });

    });

    describe('minmax', function() {

        var mock_factor_minmax = require('../mock/factor.minmax.js');

        beforeEach(function() {
            this.one = factor({value: function() {}});
        });

        Object.keys(mock_factor_minmax).forEach(function(key) {
            var set = mock_factor_minmax[key];

            it('should return min/max values for set "' + key + '"', function() {
                this.one._replacements = set.rule;

                expect( this.one.minmax(set.data) ).to.eql( set.rslt );
            });
        });

    });

    describe('replacements', function() {

        var mock_factor_replacements = require('../mock/factor.replacements.js');

        beforeEach(function() {
            this.one = factor({value: function() {}});
        });

        Object.keys(mock_factor_replacements).forEach(function(key) {
            var set = mock_factor_replacements[key];

            it('should replace values for set "' + key + '"', function() {
                this.one._replacements = set.rule;

                expect( this.one.replacements(set.data, set.mmax) ).to.eql( set.rslt );
            });
        });
    });

    describe('normalize', function() {

        var mock_factor_normalize = require('../mock/factor.normalize.js');

        beforeEach(function() {
            this.one = factor({value: function() {}});
        });

        Object.keys(mock_factor_normalize).forEach(function(key) {
            var set = mock_factor_normalize[key];

            it('should return normalized values for set "' + key + '"', function() {
                this.one.invert = set.invert;

                expect( this.one.normalize(set.data, set.mmax) ).to.eql( set.rslt );
            });
        });

    });

    describe('append', function() {

        beforeEach(function() {
            this.one = factor({value: function() { return 3; }});
            sinon.spy(this.one, 'value');
        });

        it('should set `_index` property', function() {
            this.one.append(4);

            expect( this.one._index ).to.eql(4);
        });

        it('should call `value` with given params', function() {
            this.one.append(4, 5, 6);

            expect( this.one.value.calledWith(5, 6) ).to.be.ok();
        });

        it('should set `_values` item for given index', function() {
            this.one.append(10);

            expect( this.one._values[10] ).to.eql(3);
        });

    });

    describe('exec', function() {

        beforeEach(function() {
            this.one = factor({value: function() {}});
            this.two = factor({valueAll: function(data, cond) { return [3, 4, 5]; }});
            this.three = factor({valueAll: function(data, cond, done) { return [6, 7, 8]; }});

            sinon.spy(this.one, 'done');
            sinon.spy(this.two, 'done');
            sinon.spy(this.three, 'valueAll');
            sinon.spy(this.three, 'done');
        });

        it('should call `done` with precalculated values when `!isAll`', function() {
            this.one._values = [1, 2, 3];
            this.one.exec();

            expect( this.one.done.calledWith([1, 2, 3]) ).to.be.ok();
        });

        it('should call `done` with result of `valueAll` when it gets 2 arguments', function() {
            this.two.exec();

            expect( this.two.done.calledWith([3, 4, 5]) ).to.be.ok();
        });

        it('should put `done` as an argument to `valueAll`, when it gets 3 arguments', function() {
            this.three.exec([1, 3], {});
            this.three.valueAll.args[0][2]([3, 4]);

            expect( this.three.done.calledWith([3, 4]) ).to.be.ok();
        });

        describe('done', function() {

            var mock_factor_done = require('../mock/factor.done.js');

            beforeEach(function() {
                this.one = factor({value: function() {}});
            });

            Object.keys(mock_factor_done).forEach(function(key) {
                var set = mock_factor_done[key];

                it('should resolve promise with right value for set "' + key + '"', function(done) {
                    var promise = pzero();

                    this.one.invert = set.invert;
                    this.one._replacements = set.rule;
                    this.one.done( set.data, promise );

                    promise.then(function(values) {

                        expect(values).to.eql(set.rslt);
                        done();

                    });
                });
            });

        });
    });

});
