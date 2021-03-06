var api = require('./api');
var path = require('path');

module.exports = function(app) {

	// ==============================================
	// Application
	// ==============================================
	
	// Home route
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/main', 'index.html'));
	});

	// Dashboard
	app.get('/dashboard', function(req, res) {
		res.sendFile(path.join(__dirname, '../public/dashboard', 'dashboard.html'));
    });
    

	// ==============================================
	// API
	// ==============================================

	// Get test value
	app.get('/api/test', api.getTest);

	// Get all stories
	app.get('/api/stories', api.getAll);

	// Get one story
	app.get('/api/story/:story_id', api.getOne);

	// Get story list
	app.get('/api/stories/:story_id_list', api.getList);

	// Create story
	app.post('/api/stories', api.create);

	// Update story
	app.put('/api/stories', api.update);	

	// Create option in story
	app.put('/api/stories/newOption', api.createOption);

	// Delete story
	app.delete('/api/stories/:story_id', api.delete);	

	// Get image file list
	app.get('/api/bgimages', api.getBgImgList);	
	app.get('/api/modifierimages', api.getModifierImgList);	

	// Get risk levels
	app.get('/api/riskLevels', api.getRiskLevels);	

	// Get modifier types
	app.get('/api/modifiertypes', api.getModifierTypes);		
}