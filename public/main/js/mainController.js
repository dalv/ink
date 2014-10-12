angular.module('ink')
  .controller('mainController', function($scope, $http, storyService) {

		storyService.getOne()
			.success(function(data) {
				$scope.story = data;
			})
			.error(function(err){
				// display error
				alert(err);
			});
});