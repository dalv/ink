(function(api){

	var StoryModel = require('./models/storyModel').StoryModel;
	var OptionModel = require('./models/storyModel').OptionModel;	

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
				text : req.body.text, 
				opts: req.body.opts
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

})(module.exports);