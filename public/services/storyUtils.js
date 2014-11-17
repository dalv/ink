// --------------------------------------------------
// Story Utility Service
// --------------------------------------------------
(function() {

  var storyUtils = function() {

    // --------------------------------------------------
    // Get story by id
    // --------------------------------------------------
		var getStoryById = function(storyCards, storyId) {
			var story = undefined;
			for (var i = 0; i < storyCards.length; i++) {
				if(storyCards[i].story._id == storyId) {
					story = storyCards[i].story;
					break;
				}
			}
			return story;
		};

    // --------------------------------------------------
    // Get story preview by id
    // --------------------------------------------------
		var getStoryPreviewById = function(storyCards, storyId) {
			var preview = "";
			var story = getStoryById(storyCards, storyId);
			if (story != undefined)
			{
				preview = story.preview;
			}
			return preview;
		};		

    // --------------------------------------------------
    // Get risk level text by value
    // --------------------------------------------------
		var getRiskLevelText = function(riskLevels, riskLevelValue) {
			var text = undefined;
			if(riskLevels != undefined)	{
				for (var i = 0; i < riskLevels.length; i++) {
					if(riskLevels[i].value == riskLevelValue) {
						text = riskLevels[i].text;
						break;
					}
				}
			}
			return text;
		};		

    // --------------------------------------------------
    // Build story cards using story array and previous cards
    // --------------------------------------------------
		var buildCards = function(stories, oldCards) {
			var newCards = [];

			stories.forEach(function(story){
				var card = new Object();

				if(oldCards != undefined){
					var prevCard = getCardByStoryId(oldCards, story._id);
					if(prevCard != undefined){
						card.isExpanded = prevCard.isExpanded;
					}
				}

				card.story = story;
				newCards.push(card);
			});

			return newCards;
		};

    // --------------------------------------------------
    // Get card by story id
    // --------------------------------------------------
		var getCardByStoryId = function(cards, storyId)	{
			var card = undefined;
			for (var i = 0; i < cards.length; i++) {
				if(cards[i].story._id == storyId) {
					card = cards[i];
					break;
				}
			}
			return card;
		}

    // --------------------------------------------------
    // Expose public methods as service API
    // --------------------------------------------------
		return {
			getStoryPreviewById : getStoryPreviewById,
			getRiskLevelText : getRiskLevelText,
			buildCards : buildCards
	  };
  };

  // --------------------------------------------------
  // Create storyUtils module
  // --------------------------------------------------
  var module = angular.module("storyUtils", []);
  
  // --------------------------------------------------
  // Register storyUtils service with storyUtils module
  // --------------------------------------------------
  module.factory("storyUtils", storyUtils);

}());