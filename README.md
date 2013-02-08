rAnk
====

## Install

    npm install rank

## Usage

### rAnk

    var rAnk = require('rAnk');
    
#### Methods

```javascript
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
```
        
You can also call `.run()` without any params, then it will return [p0](https://github.com/artjock/p) promise, which will be resolved with `result` argument.

#### factors

Each factor is described by factor's description, wich has the following properties:

```javascript
{
    id: 'my factor',    // your factor name, which must be unique,
                        // you can skip it, then the system will generate it for you
                        // it will be the same through application calls,
                        // but it will take some time to generate it

    invert: true,       // by default is false, that means, that the greater value you have,
                        // the greater mark each item gets.
                        // When you set invert to true it means, that the greater value you have,
                        // the lower the mark will be.

    // function, that will calculate value for each item of data,
    // this value will be used by system to calculate final mark
    // conditions is the object you passed to rAnk().conditions()

    value: function(item, conditons) {
        return new Date - item.ts;
    },
    
    // is the same as value, except it gets all the data set,
    // you should iterate through it by yourself and replace
    // each item with factor's value.
    // When you set "done" as argument,
    // it means, that "valueAll" is asyncronous.
    // So you should call "done" with values array, when valueAll is done

    valueAll: function(data, conditions, done) {
        return data.map(function(item) { return new Date - item.ts; });
    }
}
```
    
There are some situations, when don't know exactly which values to return, but your know, that the value should be the lowest or the highest in the set. For this situations you can use `minValue()` and `maxValue()` functions:

```javascript
value: function(item) {
    return item.ts ? new Date - item.ts : this.minValue();
}
```
    
You also may want to delete some item from the resulting dataset. You should use `removeItem()` for it:

```javascript
value: function(item) {
    if (item.ts < 0) {
        this.removeItem();
    } else {
        return item.ts;
    }
}
```
    
For both `removeItem()` and `min/maxValue()` when you use it in `valueAll` function you should pass index of item as an argument:

```javascript
valueAll: function(data) {
    var that = this;
    data.map(function(item, i) {
        if (item.ts < 0) {
            that.removeItem(i);
        } else {
            return item.ts ? new Date - item.ts : that.minValue(i);
        }
    });
}
```

