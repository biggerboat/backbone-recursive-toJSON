# backbone-recursive-toJSON [![Build Status](https://travis-ci.org/biggerboat/backbone-recursive-toJSON.png)](https://travis-ci.org/biggerboat/backbone-recursive-toJSON)

*Note: Tracis-CI reports a failing build at the moment. Somehow there is a configuration issue with Travis. All tests are passing on many browsers I've tested with.*

This little helper alters the ```Backbone.Model.toJSON``` method. When this call is executed we loop through all the
properties and see if there is another object that has the ```toJSON``` method. If an array is detected we will loop over
all items and see if there is an object with a ```toJSON``` method.

This makes it easy to do:
```JavaScript
var modelA = new Backbone.Model({name:'modelA'});
var modelB = new Backbone.Model({name:'modelB'});
modelA.set({otherModel:modelB});

var modelAData = modelA.toJSON();

console.log(modelAData.otherModel.name);
```

Be aware for circular relationships, is this will get you in a recursive loop. So for example ```modelA``` having a reference to
```modelB``` and ```modelB``` having a reference back to ```modelA```.

Please see the specs for full details.

For example usage of this library, please refer to [Navigator-Injector-Backbone-Command-TodoMVC example](https://github.com/BiggerBoat/nibc-todomvc).
