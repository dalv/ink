(function() {

	angular.module("ink").controller('mainController', function($scope, dataAccess) {

    // ==================================================
    // --------------------  On Load  -------------------
    // ==================================================
		var onGetStory = function(data){
			$scope.story = data;	
		};

		var onDataAccessError = function(err){
			alert(err);
		};

		dataAccess.getStory().then(onGetStory, onDataAccessError);

    // ==================================================
    // --------------  Handle user events  --------------
    // ==================================================

		// --------------------------------------------------
		// Load story
		// --------------------------------------------------
		$scope.loadStory = function(storyId){
			dataAccess.getStory(storyId).then(onGetStory, onDataAccessError);
		}


  // --------------------------------------------------
  // End of controller definition
  // --------------------------------------------------		
	});

}());