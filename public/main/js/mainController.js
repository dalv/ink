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
			inventoryHandler.appendToInventory($scope.inventory, $scope.story, $scope.storyPath);
		};

		var onDataAccessError = function(err){
			alert(err);
		};

		$scope.loadStory = function(storyId)	{
			dataAccess.getStory(storyId).then(onGetStory, onDataAccessError);			
		}

		$scope.buildInventory = function(){
			$scope.inventory = inventoryHandler.buildInventoryList($scope.storyPath);
		};

		$scope.loadStory();

    // ==================================================
    // --------------  Handle user events  --------------
    // ==================================================


  // --------------------------------------------------
  // End of controller definition
  // --------------------------------------------------		
	});

}());