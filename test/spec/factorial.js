var expect = require('expect.js');
var factorial = process.env.COVERAGE ?
    require('../../lib-cov/factorial.js') :
    require('../../lib/factorial.js');

describe('factorial', function() {

    describe('config', function() {

        var config = {
            name1: 'val1',
            name2: 'val2'
        };

        beforeEach(function() {
            factorial._config = config;
        });

        it('should get config item', function() {
            expect( factorial.config('name2') ).to.be('val2');
        });

        it('should set config item', function() {
            factorial.config('name3', 'val3');
            expect( factorial.config('name3') ).to.be('val3');
        });

        it('should overwrite config item', function() {
            factorial.config('name2', 'valnew');
            expect( factorial.config('name2') ).to.be('valnew');
        });

        it('should set config items with object', function() {
            factorial.config({name2: 'valnew', name3: 'val3'});
            expect( factorial.config('name1') ).to.be('val1');
            expect( factorial.config('name2') ).to.be('valnew');
            expect( factorial.config('name3') ).to.be('val3');
        });

    });

});
