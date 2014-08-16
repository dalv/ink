angular.module('ink')
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
		if (window.confirm("Are you sure you want to delete this story?"))	{		
			storyService.delete(story._id)
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
	// File upload
	// =================================================
	$scope.uploadBackgroundImage = function(elem)
	{
		alert(elem);
	};



	$scope.onFileSelect = function($files) {
		alert("x");
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      alert(file);
      $scope.upload = $upload.upload({
        url: '/api/upload/background', //upload.php script, node.js route, or servlet url
        // method: 'POST' or 'PUT',
        // headers: {'header-key': 'header-value'},
        // withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files: $files for html5 only
        // fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file
    /* customize file formData name ('Content-Desposition'), server side file variable name. 
        Default is 'file' */
        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
        //formDataAppender: function(formData, key, val){}
      }).success(function(data, status, headers, config) {

      });
    }
  };  

});
