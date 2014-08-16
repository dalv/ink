var api = require('./api');

module.exports = function(app) {

	// ==============================================
	// Application
	// ==============================================
	
	// Home route
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

	// Dashboard
	app.get('/dashboard', function(req, res) {
		res.sendfile('./public/dashboard.html');
	});

	// ==============================================
	// API
	// ==============================================

	// Get all stories
	app.get('/api/stories', api.getAll);

	// Get one story
	app.get('/api/stories/:story_id', api.getOne);

	// Create story
	app.post('/api/stories', api.create);

	// Update story
	app.put('/api/stories', api.update);	

	// Create option in story
	app.put('/api/stories/newOption', api.createOption);

	// Delete story
	app.delete('/api/stories/:story_id', api.delete);	

		// Upload files
	app.post('/api/upload/modifier', api.uploadModifier);	
	app.post('/api/upload/background', api.uploadBackground);	
}