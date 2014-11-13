angular.module('dashboard')
  .controller('dashboardController', function($scope, $http, storyService) {

	$scope.stories = [];
  $scope.filteredStories = [];
  $scope.currentPage = 0;
  $scope.numPerPage = 5;
  $scope.maxSize = 5;
  $scope.numPages = 0;

  // =============================================
	// Load all
	// =============================================
  var loadStories = function(){
		storyService.getAll()
			.success(function(data) {
				setStories(data);
			})
			.error(function(err){
				alert(err);
			});
/*
		storyService.getTest()
			.success(function(data) {
				alert("Test data: " + data);
			})
			.error(function(err){
				alert("Error retrieving test data: " + err);
			});
*/
		// Get list of backgorund images
		storyService.getBgImages()
			.success(function(files) {	
    			$scope.bgImages = files;
    			$scope.bgImages.push('');
					$scope.bgImages = $scope.bgImages.sort();
			})
			.error(function(err){
				alert(err);
			});


		// Get list of Modifier images
		storyService.getModifierImages()
			.success(function(files) {
    			$scope.modifierImages = files;
    			$scope.modifierImages.push('');
					$scope.modifierImages = $scope.modifierImages.sort();
			});
	}

  // =============================================
	// Do this when first firing up the controller
	// =============================================  
  loadStories();

	// =============================================
	// Enhance story array with extra properties
	// =============================================
	var setStories = function(data){
		// =============================================
		// Attach properties: preview and number
		// =============================================
		var storyNumber = 1;

		data.forEach(function(s){
			s.number = storyNumber;
			storyNumber = storyNumber + 1;

			var storyPreview = "";
			if(s.text != undefined) {
				var txtArray = s.text.split(" ");

				if(txtArray.length >= 3)
					storyPreview = s.number + ". " + txtArray[0] + " " + txtArray[1] + " " + txtArray[2] + " ...";
				else
					storyPreview = s.number + ". " + s.text;
			}

			s.preview = storyPreview;

			// =============================================
			// If this is a post back, get some data form the previous story collection
			// =============================================
			if ($scope.stories == undefined) {
				s.isExpanded = false;
			}
			else {
				var prevStory = getStoryById(s._id);
				if(prevStory != undefined)
				{
					s.isExpanded = prevStory.isExpanded;
				}
			}

		});

		// =============================================
		// Assign collection to scope
		// =============================================
		$scope.stories = data;

		// =============================================
		// Initialize pagination
		// =============================================
    $scope.numPages = Math.ceil($scope.stories.length / $scope.numPerPage);
    $scope.currentPage = 1
	}

	// =================================================
	// Create story
	// =================================================
	$scope.createStory = function() {
		storyService.createStory()
		.success(function(data) {
			setStories(data);
		});
	};

	// =================================================
	// Update story
	// =================================================
	$scope.updateStory = function(story) {
		storyService.updateStory(story)
		.success(function(data) {
			setStories(data);
		});
	};

	// =================================================
	// Delete story
	// =================================================
	$scope.deleteStory = function(story) {
		if (window.confirm("Are you sure you want to delete this story?"))	{		
			storyService.deleteStory(story._id)
				.success(function(data) {
					setStories(data);
				});
			}
	};

	// =================================================
	// Create option
	// =================================================
	$scope.createOption = function(story) {
		storyService.createOption(story)
		.success(function(data) {
			setStories(data);
		});
	};

	// =================================================
	// Delete story
	// =================================================
	$scope.deleteOption = function(story, option) {
		if (window.confirm("Are you sure you want to delete this option?"))	{
			var optionIndex = story.opts.indexOf(option);
			if(optionIndex > -1) {
				story.opts.splice(optionIndex, 1);
				storyService.update(story)
				.success(function(data) {
					setStories(data);
				});
			}
		}
	};

	// =================================================
	// Find story by id
	// =================================================
	var getStoryById = function(storyId) {
		var story = undefined;
		for (var i = 0; i < $scope.stories.length; i++) {
			if($scope.stories[i]._id == storyId) {
				story = $scope.stories[i];
				break;
			}
		}
		return story;
	};

	$scope.getPreviewById = function(storyId) {
		var preview = "";
		var story = getStoryById(storyId);
		if (story != undefined)
		{
			preview = story.preview;
		}
		return preview;
	};		

	// =================================================
	// Expand/Collapse Story Cards
	// =================================================
	$scope.expandAll = function(expand) {
		$scope.stories.forEach(function(s){
			s.isExpanded = expand;
		});
	};

	// =================================================
	// Helper functions
	// =================================================
	$scope.nl2br = function nl2br (str) {      
    return str.replace(new RegExp('\r?\n','g'), '<br />');
	};

	// =================================================
	// Risk level - this array should go into a db table
	// =================================================
  $scope.riskLevels = [
    {value: 0, text: 'low'},
    {value: 1, text: 'medium'},
    {value: 2, text: 'high'}
  ]; 	

  $scope.getRiskLevel = function(selectedValue)
  {
		var text = undefined;
		for (var i = 0; i < $scope.riskLevels.length; i++) {
			if($scope.riskLevels[i].value == selectedValue) {
				text = $scope.riskLevels[i].text;
				break;
			}
		}
		return text;
  };

	// =================================================
	// Handle pagination
	// =================================================
  $scope.$watch('currentPage', function() {
    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;
    
    $scope.filteredStories = $scope.stories.slice(begin, end);
  });  


});
