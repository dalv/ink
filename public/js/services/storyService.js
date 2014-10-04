angular.module('ink')

	// super simple service
	// each function returns a promise object 
	.factory('storyService', function($http) {
		return {
			getTest : function() {
				return $http.get('/api/test/');
			},
			getAll : function() {
				return $http.get('/api/stories/');
			},
			getOne : function(storyId) {
				return $http.get('/api/stories/' + storyId);
			},			
			create : function(story) {
				return $http.post('/api/stories', story);
			},
			update : function(story) {
				return $http.put('/api/stories/', story);
			},			
			delete : function(storyId) {
				return $http.delete('/api/stories/' + storyId);
			},
			createOption : function(story) {
				return $http.put('/api/stories/newOption', story);
			},
			getBgImages : function() {
				return $http.get('/api/bgimages/');
			},
			getModifierImages : function() {
				return $http.get('/api/modifierimages/');
			}		
		}
	});
