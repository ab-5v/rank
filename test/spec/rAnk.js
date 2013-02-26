var expect = require('expect.js');

var rAnk = process.env.COVERAGE ?
    require('../../lib-cov/rAnk.js') :
    require('../../lib/rAnk.js');

describe('rAnk', function() {

    beforeEach(function() {
        this.rank = rAnk();
    });

    describe('_init', function() {

        it('should create empty descriptions array', function() {
            expect( this.rank._descriptions ).to.eql([]);
        });

        it('should create empty data array', function() {
            expect( this.rank._data ).to.eql([]);
        });

        it('should create empty weights array', function() {
            expect( this.rank._weights ).to.eql([]);
        });

        it('should create empty conditions object', function() {
            expect( this.rank._conditions ).to.eql({});
        });

    });

    describe('factor', function() {

        it('should add one description', function() {
            this.rank.factors({});

            expect( this.rank._descriptions.length ).to.eql(1);
        });

        it('should add array of descriptions', function() {
            this.rank.factors([{}, {}]);

            expect( this.rank._descriptions.length ).to.eql(2);
        });

        it('should append descriptions', function() {
            this.rank
                .factors([{}, {}])
                .factors({});

            expect( this.rank._descriptions.length ).to.eql(3);
        });

    });

    ['weights', 'data', 'conditions'].forEach(function(name) {

        describe(name, function() {

            it('should add ' + name, function() {
                this.rank[name]({a: 1});

                expect( this.rank['_' + name] ).to.eql({a: 1});
            });

            it('should overwrite ' + name, function() {
                this.rank[name]({a: 1});
                this.rank[name]({a: 2});

                expect( this.rank['_' + name] ).to.eql({a: 2});
            });
        });

    });

});
