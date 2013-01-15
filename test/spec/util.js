var expect = require('expect.js');

var util = process.env.COVERAGE ?
    require('../../lib-cov/util.js') :
    require('../../lib/util.js');

describe('util', function() {

    describe('promise', function() {
        beforeEach(function() {
            this.promise = util.promise();
        });

        it('should fire with resolve at the end', function(done) {
            this.promise.then(function(data) {
                expect(data).to.eql(1);
                done();
            });

            this.promise.resolve(1);
        });

        it('should fire with resolve at the begining', function(done) {
            this.promise.resolve(1);

            this.promise.then(function(data) {
                expect(data).to.eql(1);
                done();
            });

        });

        it('should fire with async resolve', function(done) {
            setTimeout(function() {
                this.promise.resolve(1);
            }.bind(this), 50);

            this.promise.then(function(data) {
                expect(data).to.eql(1);
                done();
            });

        });

        it('should fire multiple callbacks', function() {
            var count = '';
            this.promise.then(function() { count+='a'; });
            this.promise.then(function() { count+='b'; });

            this.promise.resolve();

            expect(count).to.eql('ab');
        });

        it('should wait for promise', function(done) {
            util.promise.when([this.promise]).then(function(data) {
                expect(data[0]).to.eql(1);
                done();
            });

            this.promise.resolve(1);
        });

        it('should wait for multiple promises', function() {
            var res = 0;
            var p1 = util.promise();
            var p2 = util.promise();
            var p3 = util.promise();

            util.promise.when([p1,p2,p3]).then(function() {
                res = 1;
            });

            p1.resolve();
            expect(res).to.eql(0);
            p2.resolve();
            expect(res).to.eql(0);
            p3.resolve();
            expect(res).to.eql(1);
        });

    });

});
