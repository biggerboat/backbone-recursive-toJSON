//A little recursive helper. It is known for not being bugfree when there are recursive relations

//Recursive toJSON() call on models and its submodels
var superToJSON = Backbone.Model.prototype.toJSON;
_.extend (Backbone.Model.prototype, {
	_superToJSON: null,

	toJSON: function() {
		console.log('Model -> toJSON');
		var JSON = this._superToJSON(),
			array;

		for (var property in JSON) {
			//Make sure there is a toJSON method to call
			if (!_.isEmpty(JSON[property])) {
				if (typeof JSON[property]["toJSON"] === 'function') {
					JSON[property] = JSON[property].toJSON();
				} else if(_.isArray(JSON[property])) {
					array = [];
					//Also call toJSON methods on an array of models
					for (var i = 0; i<JSON[property].length; i++) {
						if(!_.isEmpty(JSON[property][i]) && typeof JSON[property][i]["toJSON"]==='function') {
							array.push(JSON[property][i].toJSON());
						} else {
							array.push(JSON[property][i]);
						}
					}
					JSON[property] = array;
				}
			}
		}

		return JSON;
	}
});
Backbone.Model.prototype._superToJSON = superToJSON;