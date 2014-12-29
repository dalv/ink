// --------------------------------------------------
// Data Access Service
// --------------------------------------------------
(function() {

  var dataAccess = function($http) {

    // --------------------------------------------------
    // Define public methods
    // --------------------------------------------------
		var getTest = function() {
		//	return unwrap($http.get('/api/test/'));
		};

		var getStories = function() {
			return unwrap($http.get('/api/stories/'));
		};

		var getStory = function(storyId) {
			return unwrap($http.get('/api/story/' + storyId));
		};

		var getStoryList = function(storyIdList) {
			return unwrap($http.get('/api/stories/' + storyIdList));
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

		var deleteOption = function(story, option) {
			var optionIndex = story.opts.indexOf(option);
			if(optionIndex > -1) {
				story.opts.splice(optionIndex, 1);
				return updateStory(story);
			}
		};

		var getBgImages = function() {
			return unwrapImageList($http.get('/api/bgimages/'));
		};

		var getModifierImages = function() {
			return unwrapImageList($http.get('/api/modifierimages/'));
		};

		var getRiskLevels = function() {
			return unwrap($http.get('/api/riskLevels/'));
		};

		var getModifierTypes = function() {
			return unwrap($http.get('/api/modifiertypes/'));
		};		
		
    // --------------------------------------------------
    // Expose inner properties from http promise object
    // --------------------------------------------------
		var unwrap = function (httpPromiseObject){
			return httpPromiseObject.then(function(response) { return response.data; });
		};

		var unwrapImageList = function (httpPromiseObject){
			return httpPromiseObject.then(function(response) { 
				var imageList = response.data;
				imageList.push('');
				imageList = imageList.sort();
				return imageList;
			});
		};

    // --------------------------------------------------
    // Expose public methods as service API
    // --------------------------------------------------
		return {
			getTest : getTest,
			getStories : getStories,
			getStory : getStory,		
			getStoryList: getStoryList,	
			createStory : createStory,
			updateStory : updateStory,			
			deleteStory : deleteStory,
			createOption : createOption,
			deleteOption : deleteOption,
			getBgImages : getBgImages,
  		getModifierImages : getModifierImages,
  		getRiskLevels : getRiskLevels,
  		getModifierTypes : getModifierTypes
	  };
  };

  // --------------------------------------------------
  // Create dataAccess module
  // --------------------------------------------------
  var module = angular.module("dataAccess", []);
  
  // --------------------------------------------------
  // Register dataAccess service with dataAccess module
  // --------------------------------------------------
  module.factory("dataAccess", dataAccess);

}());