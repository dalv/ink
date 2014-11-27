(function() {

	angular.module("ink").controller('mainController', function($scope, dataAccess, inventoryHandler) {

		$scope.story = null;
		$scope.storyPath = [];
		$scope.inventory = [];

    // ==================================================
    // --------------------  On Load  -------------------
    // ==================================================
		var onGetStory = function(data){
			$scope.story = data;
			$scope.storyPath.push(data._id);

			var newInventoryItem = inventoryHandler.buildInventoryItem($scope.story);
			if (newInventoryItem!=null) {
				$scope.inventory.push(newInventoryItem);
			}
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