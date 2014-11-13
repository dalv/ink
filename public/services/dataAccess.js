// ==================================================
// Data Access Service
// ==================================================
(function() {

  var dataAccess = function($http) {

    // ==================================================
    // Define public methods
    // ==================================================
		var getTest = function() {
			return unwrap($http.get('/api/test/'));
		};

		var getStoriesAll = function() {
			return unwrap($http.get('/api/stories/'));
		};

		var getStory = function(storyId) {
			var story = unwrap($http.get('/api/stories/' + storyId));
			return story;
		};

		var createStory = function(story) {
			return unwrap($http.post('/api/stories', story));
		};

		var updateStory = function(story) {
			return unwrap($http.put('/api/stories/', story));
		};

		var deleteStory = function(storyId) {
			return unwrap($http.delete('/api/stories/' + storyId));
		};

		var createOption = function(story) {
			return unwrap($http.put('/api/stories/newOption', story));
		};

		var getBgImages = function() {
			return unwrap($http.get('/api/bgimages/'));
		};

		var getModifierImages = function() {
			return unwrap($http.get('/api/modifierimages/'));
		};

    // ==================================================
    // Define private methods
    // ==================================================
		var unwrap = function (httpPromiseObject){
			var data = httpPromiseObject.then(function(response) { return response.data; });
			return data;
		};

    // ==================================================
    // Expose service API
    // ==================================================
		return {
			getTest : getTest,
			getStoriesAll : getStoriesAll,
			getStory : getStory,			
			createStory : createStory,
			updateStory : updateStory,			
			deleteStory : deleteStory,
			createOption : createOption,
			getBgImages : getBgImages,
  		getModifierImages : getModifierImages
	  };
  };

  // ==================================================
  // Create DataAccess module
  // ==================================================
  var module = angular.module("dataAccess", []);
  
  // ==================================================
  // Register DataAccess service with DataAccess module
  // ==================================================
  module.factory("dataAccess", dataAccess);

}());