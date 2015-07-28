//A little recursive helper. It is known for not being bugfree when there are recursive relations
(function(root, factory) {

    // Set up Backbone appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], function(_, Backbone) {
        // Export global even in AMD case in case this script is loaded with
        // others that may still expect a global Backbone.
        factory( _, Backbone);
    });

    // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined' && typeof require === 'function') {
        var _ = require('underscore'),
        Backbone = require('backbone');
        factory(_, Backbone);

    // Finally, as a browser global.
    } else {
        factory(root._, root.Backbone);
    }
}(this, function factory(_, Backbone) {

    //Recursive toJSON() call on models and its submodels
    var superToJSON = Backbone.Model.prototype.toJSON;
    _.extend (Backbone.Model.prototype, {
        _superToJSON: null,

        toJSON: function() {
            var json = this._superToJSON(),
                array;

            for (var property in json) {
                if(!json.hasOwnProperty(property)) {
                    continue;
                }
                //Make sure there is a toJSON method to call
                if (!_.isEmpty(json[property])) {
                    if (typeof json[property].toJSON === 'function') {
                        json[property] = json[property].toJSON();
                    } else if(_.isArray(json[property])) {
                        array = [];
                        //Also call toJSON methods on an array of models
                        for (var i = 0; i<json[property].length; i++) {
                            if(!_.isEmpty(json[property][i]) && typeof json[property][i].toJSON==='function') {
                                array.push(json[property][i].toJSON());
                            } else {
                                array.push(json[property][i]);
                            }
                        }
                        json[property] = array;
                    }
                }
            }

            return json;
        }
    });
    Backbone.Model.prototype._superToJSON = superToJSON;
}));
