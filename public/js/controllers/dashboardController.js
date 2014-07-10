angular.module('dashboardController', [])

  // inject the StoryService factory into our controller
  .controller('dashboardController', function($scope, $http, storyService) {

  // =============================================
	// Load all
	// =============================================
  var loadStories = function(){
		storyService.getAll()
			.success(function(data) {
				setStories(data);
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
		// Attach preview property
		// =============================================
		data.forEach(function(s){
			var storyPreview = "";
			if(s.text != undefined) {
				var storyTextArray = s.text.split(" ");

				if(storyTextArray.length >= 3)
					storyPreview = storyTextArray[0] + " " + storyTextArray[1] + " " + storyTextArray[2] + " ...";
				else
					storyPreview = s.text;
			}

			s.preview = storyPreview;
		});

		// =============================================
		// Assign collection to scope
		// =============================================
		$scope.stories = data;
	}

	// =================================================
	// Create story
	// =================================================
	$scope.createStory = function() {
		storyService.create()
		.success(function(data) {
			setStories(data);
		});
	};

	// =================================================
	// Update story
	// =================================================
	$scope.updateStory = function(story) {
		storyService.update(story)
		.success(function(data) {
			setStories(data);
		});
	};

	// =================================================
	// Delete story
	// =================================================
	$scope.deleteStory = function(story) {
		storyService.delete(story._id)
			.success(function(data) {
				setStories(data);
			});
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
		var optionIndex = story.opts.indexOf(option);
		if(optionIndex > -1) {
			story.opts.splice(optionIndex, 1);
			storyService.update(story)
			.success(function(data) {
				setStories(data);
			});
		}
	};

	// =================================================
	// Find story by id
	// =================================================
	$scope.getStoryById = function(storyId) {
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
		var story = $scope.getStoryById(storyId);
		if (story != undefined)
		{
			preview = story.preview;
		}
		return preview;
	};		

	// =================================================
	// Helper functions
	// =================================================
	$scope.nl2br = function nl2br (str) {      
    return str.replace(new RegExp('\r?\n','g'), '<br />');
	};

});
