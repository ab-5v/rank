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

    describe('load', function() {

        var mock_rank_load = require('../mock/rank.load.js');

        beforeEach(function() {
            this.stat = [ [1, 2], [3, 4] ];
            this.wght = [1, 1];
            this.data = [10, 20];
        });

        it('should create descriptions from stat', function() {
            var r = rAnk().load({stat: this.stat});

            expect( r._descriptions[0].valueAll() ).to.eql( [1, 3] );
            expect( r._descriptions[1].valueAll() ).to.eql( [2, 4] );
        });

        it('should fill data, if no data provided', function() {
            expect( rAnk().load({stat: this.stat})._data ).to.eql( [0, 1] );
        });

        Object.keys(mock_rank_load).forEach(function(key) {
            var set = mock_rank_load[key];

            it('should sort data as it were sorted for set "' + key + '"', function(done) {

                rAnk().load(set.result).run(function(result) {
                    expect( result.data ).to.eql( set.result.data );
                    done()
                });

            });

            it('should sort data with new weight for set "' + key + '"', function(done) {
                var r = rAnk().load(set.result);

                r.weights(set.wght).run(function(result) {
                    expect( result.data ).to.eql( set.rslt );
                    done();
                });
            });
        });

    });

    describe('run', function() {

        var mock_rank_run = require('../mock/rank.run.js');

        it('should run callback when it passed', function(done) {
            rAnk().factors({value: function() {}}).run(function() {
                done();
            });
        });

        it('should return and resolve promise, when no callback passed', function(done) {
            rAnk().factors({value: function() {}}).run().then(function() {
                done();
            })
        });

        Object.keys(mock_rank_run).forEach(function(key) {
            var set = mock_rank_run[key];

            it('should calculate for set "' + key + '"', function(done) {
                var rank = rAnk()
                    .data( set.data )
                    .factors( set.factors );

                if (set.weights) { rank.weights( set.weights ); }
                if (set.conditions) { rank.conditions(set.conditions); }

                rank.run(function(result) {
                    expect( result.data ).to.eql( set.result );
                    done();
                });
            });

        });

    });

});
