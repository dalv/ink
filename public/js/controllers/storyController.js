angular.module('ink')
  .controller('storyController', function($scope, $http, storyService) {

	// GET =====================================================================
	// when landing on the page, get first story
	storyService.get()
		.success(function(data) {
			$scope.stories = data;
		});
  });
