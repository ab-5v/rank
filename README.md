rAnk [![Build Status](https://travis-ci.org/artjock/rAnk.png)](https://travis-ci.org/artjock/rAnk)
====

## Install

    npm install rank

## Usage

### rAnk

    var rAnk = require('rank');
    
#### Methods

```javascript
rAnk()                      // creating rAnk instance
    .factors([f1, f2])          // you can add one or more factor's description
    .factors(f3)                // you can call it more than once
    .conditions({})             // you can add conditions to be passing in each factor
    .weights([w1, w2, w3])      // you can add weights for factors
    .data([a, b, c, d])         // you should add data
    .run(); -> {}:              // call run to execute factors
        result.data;        // sorted data
        result.stat;        // statistics about factor's marks
        result.factor;      // array of factors ids
        result.weight;      // weights applied to your factors
```

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
                        // only spurs can be inverted

    // function, that will calculate value for each item of data,
    // this value will be used by system to calculate final mark (spur or fine)
    // it should return number
    // if it returns negative number, it will be interpreted as a fine and marked in the range [-1, 0]
    // if it returns non-negative number, it will be interpreted as a spur and marked the range [0, 1]
    // if it returns non-number it will be iterpreted as a neutral value
    // conditions is the object you passed to rAnk().conditions()

    value: function(item, conditons) {
        return new Date - item.ts;
    },

    // is the same as value, except it gets all the data set,
    // you should iterate through it by yourself and replace
    // each item with factor's value.

    valueAll: function(data, conditions) {
        return data.map(function(item) { return new Date - item.ts; });
    }
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

If value doesn't mean anything for given factor or it is to small, but you don't want to remove it from the resulting set, you can use `neutralValue()`:

```javascript
value: function(item) {
    if (count in item) {
        return item.count;
    } else {
        return this.neutralValue();
    }
}
```

For both `removeItem()` and `neutralValue()` when you use it in `valueAll` function you should pass index of item as an argument:

```javascript
valueAll: function(data) {
    var that = this;
    return data.map(function(item, i) {
        if (item.ts < 0) {
            that.removeItem(i);
        } else {
            return item.ts ? new Date - item.ts : that.minValue(i);
        }
    });
}
```

