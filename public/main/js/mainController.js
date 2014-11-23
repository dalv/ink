(function() {

	angular.module("ink").controller('mainController', function($scope, dataAccess, storyUtils) {

    // ==================================================
    // --------------------  On Load  -------------------
    // ==================================================
		var onGetStory = function(data){
			$scope.story = data;
		};

		var onDataAccessError = function(err){
			alert(err);
		};

		$scope.loadStory = function(storyId)	{
			dataAccess.getStory(storyId).then(onGetStory, onDataAccessError);			
		}

		$scope.loadStory();

    // ==================================================
    // --------------  Handle user events  --------------
    // ==================================================


  // --------------------------------------------------
  // End of controller definition
  // --------------------------------------------------		
	});

}());