describe("toJSON", function() {

	it("recursively calls the toJSON method on directly nested models", function() {
		var modelA = new Backbone.Model({name:'modelA'});
		var modelB = new Backbone.Model({name:'modelB'});
		modelA.set({otherModel:modelB});

		var jsonData = modelA.toJSON();

		expect(jsonData.name).toEqual('modelA');
		expect(jsonData.otherModel.name).toEqual('modelB');
	});

	it("recursively calls the toJSON method on nested models in an array", function() {
		var modelA = new Backbone.Model({name:'modelA'});
		var modelB = new Backbone.Model({name:'modelB'});
		var modelC = new Backbone.Model({name:'modelC'});
		modelA.set({models:[modelB]});
		modelB.set({models:[modelC]});

		var jsonData = modelA.toJSON();

		expect(jsonData.models[0].name).toEqual('modelB');
		expect(jsonData.models[0].models[0].name).toEqual('modelC');
	});

	it("recursively calls the toJSON method on nested models in a collection", function() {
		var modelA = new Backbone.Model({name:'modelA'});
		var modelB = new Backbone.Model({name:'modelB'});
		var modelC = new Backbone.Model({name:'modelC'});
		modelA.set({models:new Backbone.Collection([modelB])});
		modelB.set({models:new Backbone.Collection([modelC])});

		var jsonData = modelA.toJSON();

		expect(jsonData.models[0].name).toEqual('modelB');
		expect(jsonData.models[0].models[0].name).toEqual('modelC');
	});

	it("Doesn't work with circular relationships for now", function() {
		var modelA = new Backbone.Model({name:'modelA'});
		var modelB = new Backbone.Model({name:'modelB'});
		modelA.set({other:[modelB]});
		modelB.set({other:[modelA]});

		expect(function() {var jsonData = modelA.toJSON()}).toThrow();

//		expect(jsonData.name).toEqual('modelA');
//		expect(jsonData.other.name).toEqual('modelB');
//		expect(jsonData.other.other.name).toEqual('modelA');
	});

});