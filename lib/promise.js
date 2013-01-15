var P = function() {
    this._callbacks = [];
};

P.prototype = {
    resolve: function(data) {
        var callback;
        this.data = data;
        while (callback = this._callbacks.shift()) {
            callback(data);
        }
    },
    then: function(callback) {
        if (this.data) {
            callback(this.data);
        } else {
            this.callbacks.push(callback);
        }
    }
};

P.when = function(promises) {
    var promise = new P();
    var result = [];
    var len = promises.length;

    promises.forEach(function(p, i) {
        p.then(function(data) {
            result[i] = data;
            len--;

            if (!len) {
                promise.resolve(result);
            }
        });
    });

    return promise;
};

module.exports = P;
