(function() {

	angular.module("ink").controller('mainController', function($scope, dataAccess) {

    // ==================================================
    // Handle scope binding
    // ==================================================
		var onGetStory = function(data){
			$scope.story = data;	
		};

		var onDataAccessError = function(err){
			alert(err);
		};

    // ==================================================
    // Call on load
    // ==================================================
		dataAccess.getStory().then(onGetStory, onDataAccessError);

  // ==================================================
  // End of controller definition
  // ==================================================		
	});

}());