rAnk
====

## Install

    npm install rank

## Usage

### rAnk

    var rAnk = require('rAnk');
    
#### Methods

    rAnk()                      // creating rAnk instance
        .factors([f1, f2])          // you can add one or more factor's description
        .factors(f3)                // you can call it more than once
        .conditions({})             // you can add conditions to be passing in each factor
        .weights([w1, w2, w3])      // you can add weights for factors
        .data([a, b, c, d])         // you should add data
        .run(function(result) {     // call run to execute factors
            result.data;        // sorted data
            result.stat;        // statistics about factor's marks
            result.weight;      // weights applied to your factors
        });
        
You can also call `.run()` without any params, then it will return [p0](https://github.com/artjock/p) promise, which will be resolved with `result` argument.
