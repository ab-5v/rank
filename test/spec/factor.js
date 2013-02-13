var sinon = require('sinon');
var expect = require('expect.js');

var factor = process.env.COVERAGE ?
    require('../../lib-cov/factor.js') :
    require('../../lib/factor.js');

var CONST = factor.CONST;

describe.only('factor2', function() {

    describe('_create', function() {

        beforeEach(function() {
            this.one = factor({id: 'factor-one', value: function() {}});
            this.all = factor({valueAll: function() {}});
            this.copy1 = factor({valueAll: function() { return []; }})
            this.copy2 = factor({valueAll: function() { return []; }});
        });

        it('should initialize `_values` property', function() {
            expect( this.one._values ).to.eql([]);
        });

        it('should initialize `_replacement` property', function() {
            expect( this.one._replacements ).to.eql({});
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

    });

    describe('_replacements', function() {

        beforeEach(function() {
            this.one = factor({value: function() {}});
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

        it('should save maxValue index in `_replacements` for current index', function() {
            this.one._index = 10;
            this.one.maxValue();

            expect( this.one._replacements[10] ).to.eql(CONST.REPLACER_MAX);
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

    describe('replacements', function() {

        var mock = require('../mock/factor.replacements.js');

        beforeEach(function() {
            this.mock = mock;
            this.data = mock.min.data;

            this.one = factor({value: function() {}});

            sinon.stub(this.one, 'replacer', function() { return mock.replacer; });
        });

        it('should not call `replacer` when no replacements found', function() {
            this.one.replacements(this.data);

            expect( this.one.replacer.called ).not.to.be.ok();
        });

        it('should return unmodified value when no replacements found', function() {
            expect( this.one.replacements(this.data) ).to.eql(this.data);
        });

        it('should call `replacer` when any replacements found', function() {
            this.one._replacements = this.mock.min.rule;
            this.one.replacements(this.data);

            expect( this.one.replacer.called ).to.be.ok();
        });

        it('should pass uniq values to `replacer`', function() {
            this.one._replacements = this.mock.min.rule;
            this.one.replacements([1, 1, 2, 2, 3, 3]);

            expect( this.one.replacer.calledWith([1, 2, 3]) ).to.be.ok();
        });

        ['min', 'max', 'del', 'com', 'all'].forEach(function(set) {

            it('should pass value to `replaser` (' + set + ')', function() {
                this.one._replacements = this.mock[set].rule;
                this.one.replacements(this.mock[set].data);

                expect( this.one.replacer.calledWith(this.mock[set].pass) ).to.be.ok();
            });

            it('should process `replacer` (' + set + ')', function() {
                this.one._replacements = this.mock[set].rule;

                expect( this.one.replacements(this.mock[set].data) ).to.eql( this.mock[set].rslt );
            });
        });
    });

    describe('replacer', function() {

        beforeEach(function() {
            this.one = factor({value: function() {}});
        });

        it('shoud return default properties on empty array', function() {
            var replacer = this.one.replacer([]);

            expect( replacer[CONST.REPLACER_MIN] ).to.eql( CONST.LIMIT_MIN );
            expect( replacer[CONST.REPLACER_MAX] ).to.eql( CONST.LIMIT_MAX );
            expect( replacer[CONST.REPLACER_DEL] ).to.eql( CONST.VALUE_DEL );
        });

        it('should return fake range on array with one element', function() {
            var replacer = this.one.replacer([3]);

            expect( replacer[CONST.REPLACER_MIN] ).to.eql( 0 );
            expect( replacer[CONST.REPLACER_MAX] ).to.eql( 6 );
            expect( replacer[CONST.REPLACER_DEL] ).to.eql( CONST.VALUE_DEL );
        });

        it('should return range on array with few elements', function() {
            var replacer = this.one.replacer([4, 6]);

            expect( replacer[CONST.REPLACER_MIN] ).to.eql( 2 );
            expect( replacer[CONST.REPLACER_MAX] ).to.eql( 8 );
            expect( replacer[CONST.REPLACER_DEL] ).to.eql( CONST.VALUE_DEL );
        });

        it('should return 0 when step is out of positives', function() {
            var replacer = this.one.replacer([1, 3]);

            expect( replacer[CONST.REPLACER_MIN] ).to.eql( 0 );
        });

    });

    describe('normalize', function() {

        var mock = require('../mock/factor.normalize.js');

        beforeEach(function() {
            this.one = factor({value: function() {}});
        });

        it('should return all 0 when minValue == maxValue', function() {
            expect( this.one.normalize([3, 3, 3, 3]) ).to.eql( [0, 0, 0, 0] );
        });

        it('should return all -1 when minValue == maxValue == delValue', function() {
            expect( this.one.normalize([-1, -1, -1, -1]) ).to.eql( [-1, -1, -1, -1] );
        });


        mock.forEach(function(set, i) {
            it('should return normalized values for set ' + i, function() {
                this.one.invert = set.invert;
                expect( this.one.normalize(set.data) ).to.eql( set.rslt );
            });
        });

    });

});
