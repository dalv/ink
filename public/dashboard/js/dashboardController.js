(function() {

	angular.module("dashboard").controller('dashboardController', function($scope, dataAccess, storyUtils) {

    // ==================================================
    // --------------------  On Load  -------------------
    // ==================================================
		var onGetStories = function(data){ 
			$scope.cards = storyUtils.buildCards(data, $scope.cards); 
		};
		var onGetRiskLevels = function(data){ 
			$scope.riskLevels = data; 
		};
		var onGetBgImages = function(data){ 
			$scope.bgImages = data; 
		};
		var onGetModifierImages = function(data){ 
			$scope.modifierImages = data; 
		};
		var onDataAccessError = function(err){ 
			alert(err); 
		};

		var onFirstLoad = function(){
			dataAccess.getStories().then(onGetStories, onDataAccessError);
			dataAccess.getRiskLevels().then(onGetRiskLevels, onDataAccessError);
			dataAccess.getBgImages().then(onGetBgImages, onDataAccessError);
			dataAccess.getModifierImages().then(onGetModifierImages, onDataAccessError);		
		};

		onFirstLoad();

    // ==================================================
    // --------------  Handle user events  --------------
    // ==================================================

		// --------------------------------------------------
		// Create story
		// --------------------------------------------------
		$scope.createStory = function() {
			dataAccess.createStory().then(onGetStories, onDataAccessError);
		};

		// --------------------------------------------------
		// Update story
		// --------------------------------------------------
		$scope.updateStory = function(story) {
			dataAccess.updateStory(story).then(onGetStories, onDataAccessError);
		};

		// --------------------------------------------------
		// Delete story
		// --------------------------------------------------
		$scope.deleteStory = function(story) {
			if (window.confirm("Are you sure you want to delete this story?"))	{		
				dataAccess.deleteStory(story._id).then(onGetStories, onDataAccessError);
			}
		};

		// --------------------------------------------------
		// Create option
		// --------------------------------------------------
		$scope.createOption = function(story) {
			dataAccess.createOption(story).then(onGetStories, onDataAccessError);
		};

		// --------------------------------------------------
		// Delete story
		// --------------------------------------------------
		$scope.deleteOption = function(story, option) {
			if (window.confirm("Are you sure you want to delete this option?"))	{
				dataAccess.deleteOption(story, option).then(onGetStories, onDataAccessError);
			}
		};

    // --------------------------------------------------
    // Get story preview by id
    // --------------------------------------------------
		$scope.getStoryPreviewById = function(storyId){
			return storyUtils.getStoryPreviewById($scope.cards, storyId);
		};

    // --------------------------------------------------
    // Get risk level text by value
    // --------------------------------------------------
	  $scope.getRiskLevelText = function(selectedValue) {
	  	return storyUtils.getRiskLevelText($scope.riskLevels, selectedValue);
	  };

		// --------------------------------------------------
		// Handle pagination
		// --------------------------------------------------
	  $scope.currentPage = 1;
	  $scope.numPerPage = 5;
    var numberOfCards = Infinity; 

	  $scope.$watchCollection('[currentPage, cards.length]', function() {
	  	if ($scope.cards) {
		    var begin = (($scope.currentPage - 1) * $scope.numPerPage);
		    var end = begin + $scope.numPerPage;
		    
		    $scope.filteredCards = $scope.cards.slice(begin, end);

		    // If new card got added, jump to last page
		    if($scope.cards.length > numberOfCards) {
		    	$scope.currentPage = Math.ceil($scope.cards.length / $scope.numPerPage);
		    }
		    numberOfCards = $scope.cards.length; 
		   }
	  }); 	  

  // --------------------------------------------------
  // End of controller definition
  // --------------------------------------------------		
	});

}());