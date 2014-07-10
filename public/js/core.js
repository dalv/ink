// Set up our apps for each of the site's pages

var appInk = angular.module('home', 
	['storyController', 'storyService']);

var appDashboard = angular.module('dashboard', 
	['dashboardController', 'storyService', 'xeditable']);