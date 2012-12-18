var expect = require('expect.js');
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

});
