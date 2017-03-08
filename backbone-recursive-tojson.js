/*
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

//A little recursive helper. It is known for not being bugfree when there are recursive relations
//Recursive toJSON() call on models and its submodels
var superToJSON = Backbone.Model.prototype.toJSON;
_.extend (Backbone.Model.prototype, {
	_superToJSON: null,

	toJSON: function() {
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
