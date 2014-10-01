(function(api){

  var fs = require('fs');
  var path = require('path');
	var StoryModel = require('./models/storyModel').StoryModel;
	var OptionModel = require('./models/storyModel').OptionModel;	

  var imgFolder =  __dirname + '../../public/img/';

	// =============================================
	// Return all story objects
	// =============================================  
	api.getAll = function(req, res) {
		StoryModel.find()
  						.sort({date: 'asc'})
  						.exec(function(err, stories) {	
			if (err)
				res.send(err)
			else
				res.json(stories);
		});
	};

	// =============================================
	// Return story object by id
	// =============================================  
	api.getOne = function(req, res) {
		StoryModel.findOne({_id: req.params.story_id}, function(err, story) {
			if (err)
				res.send(err)
			else
				res.send(story);
		});
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
				OptionModel.create({}, 
					function(err, opt) {
					if (err)
						res.send(err);
					else
					{
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
		});
	}

	// =============================================
	// Get backgorund image list
	// =============================================
	 
	api.getBgImgList = function(req, res) {
		fs.readdir(imgFolder + 'backgrounds/', function(err, files){
			res.send(files);
		});
	};

	// =============================================
	// Get modifier image list
	// =============================================  
	api.getModifierImgList = function(req, res) {
		fs.readdir(imgFolder + 'modifiers/', function(err, files){
			res.send(files);
		});
	};


})(module.exports);