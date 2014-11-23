(function(api){

  var fs = require('fs');
  var path = require('path');
	var StoryModel = require('./models/storyModel').StoryModel;
	var OptionModel = require('./models/storyModel').OptionModel;	
	var RiskLevelModel = require('./models/riskLevelModel').RiskLevelModel;	

  //var imgFolder =  __dirname + '../../public/img/';
  var imgFolder =  process.cwd() + "/public/img/";

	// =============================================
	// Return all story objects
	// =============================================  
	api.getAll = function(req, res) {
		StoryModel.find()
  						.sort({date: 'asc'})
  						.exec(function(err, stories) {	
			if (err) {
				res.send(err);
			}
			else { 
				enhanceStories(stories, req);
				res.json(stories);
			}
		});
	};

	// =============================================
	// Return story object by id OR first if no id supplied
	// =============================================  
	api.getOne = function(req, res) {

		var storyId = req.params.story_id;

		if(storyId == "undefined" || storyId == "")
		{
			StoryModel.findOne()
	  						.sort({date: 'asc'})
	  						.exec(function(err, story) {	
				if (err)
					res.send(err)
				else
				{
					enhanceStories(story, req);
					res.json(story);
				}
			});		
		}
		else
		{
			StoryModel.findOne({_id: storyId}, function(err, story) {
				if (err)
					res.send(err)
				else
				{
					enhanceStories(story, req);
					res.json(story);
				}
			});
		}
	};

	// =============================================
	// Create new story in the db
	// =============================================  
	api.create = function(req, res) {
		StoryModel.create({}, 
			function(err, story) {
			if (err)
				res.send(err);
			else
				api.getAll(req, res);
		});
	}	

	// =============================================
	// Update story in the db - replaces story in db with received story object
	// =============================================  
	api.update = function(req, res) {
		StoryModel.update(
			{_id : req.body._id}, 
			{ 
				text: 								req.body.text, 
				opts: 								req.body.opts,
				bg_img: 							req.body.bg_img,
				modifier: 						req.body.modifier,
				modifier_text: 				req.body.modifier_text,
				modifier_desc: 				req.body.modifier_desc,
				modifier_img: 				req.body.modifier_img,
				redirect: 						req.body.redirect,
				redirect_seconds: 		req.body.redirect_seconds,	
				redirect_to: 					req.body.redirect_to,	
				exhaustable: 					req.body.exhaustable,	
				exhaustable_opt_text: req.body.exhaustable_opt_text,	
				exhaustable_opt_next: req.body.exhaustable_opt_next,
				risk_level: 					req.body.risk_level					
			},
		  function(err, story) {
			if (err)
				res.send(err);
			else
				api.getAll(req, res);
		});	
	}

	// =============================================
	// Delete story from the db
	// =============================================  
	api.delete = function(req, res) {
		StoryModel.remove(
			{_id : req.params.story_id},
			function(err, story) {
			if (err)
				res.send(err);
			else
				api.getAll(req, res);
		});
	}

	// =============================================
	// Add new option to story object by id
	// =============================================  
	api.createOption = function(req, res) {
		StoryModel.findOne({_id: req.body._id}, function(err, story) {
			if (err)
				res.send(err)
            else {
              var opt = new OptionModel();
              story.opts.push(opt);
							story.save(function(err) {
					if (err)
						res.send(err);
					else
            api.getAll(req, res);
				});				
			}
		});
	}

	// =============================================
	// Get backgorund image list
	// ============================================= 
	api.getBgImgList = function(req, res) {
		fs.readdir(imgFolder + 'backgrounds/', function(err, files){
			if (err)
				res.send(err)
			else
				res.send(files);
		});
	};

	// =============================================
	// Get modifier image list
	// =============================================  
	api.getModifierImgList = function(req, res) {
		fs.readdir(imgFolder + 'modifiers/', function(err, files){
			if (err)
				res.send(err)
			else
				res.send(files);
		});
	};

	// =============================================
	// Get risk levels
	// =============================================  
	api.getRiskLevels = function(req, res) {
		RiskLevelModel.find({}, function(err, riskLevels) {	
			if (err)
				res.send(err)
			else
				res.json(riskLevels);
		});
	};

	// =============================================
	// Test method for various stuff
	// =============================================  
	api.getTest = function(req, res) {
		res.send(process.cwd());
	};  

	var enhanceStories = function(stories, req) {
		var urlRequest = req.protocol + '://' + req.get('host');
		var urlModifiers = urlRequest + '/img/modifiers/';
		var urlBackgrounds = urlRequest + '/img/backgorunds/';

		// Attach some extra properties to story objects
		if (stories.length) {
			var storyNumber = 0;

			stories.forEach(function(story){
				storyNumber = storyNumber + 1;
				enhanceStory(story, storyNumber, urlModifiers, urlBackgrounds);
			});		
		}
		else {
			// if stories.length is undefined, that means we only have one story object
			enhanceStory(stories, 1, urlModifiers, urlBackgrounds);
		}
	}

	var enhanceStory = function(story, storyNumber, urlModifiers, urlBackgrounds){

			// Story number
			story.number = storyNumber;

			// Story preview
			var storyPreview = "";
			if(story.text != undefined) {
				var txtArray = story.text.split(" ");

				if(txtArray.length >= 3)
					storyPreview = story.number + ". " + txtArray[0] + " " + txtArray[1] + " " + txtArray[2] + " ...";
				else
					storyPreview = story.number + ". " + story.text;
			}
			story.preview = storyPreview;

			// Image Paths
			if(story.modifier_img != '')
				story.modifier_img_fullpath = urlModifiers + story.modifier_img;

			if(story.bg_img != '')
				story.bg_img_fullpath = urlModifiers + story.bg_img;
	};

})(module.exports);