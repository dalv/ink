(function() {

	angular.module("dashboard").controller('dashboardController', function($scope, dataAccess) {

    // ==================================================
    // Handle scope binding
    // ==================================================
		var onGetStoriesAll = function(data){
			$scope.stories = data;
		};

		var onDataAccessError = function(err){
			alert(err);
		};

    // ==================================================
    // Call on load
    // ==================================================
		dataAccess.getStoriesAll().then(onGetStoriesAll, onDataAccessError);
		
  // ==================================================
  // End of controller definition
  // ==================================================		
	});

}());