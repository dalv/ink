// --------------------------------------------------
// Diagram Service
// --------------------------------------------------
(function() {

  var diagramBuilder = function() {

    var getStoryById = function(stories, storyId) {
      var story = undefined;
      for (var i = 0; i < stories.length; i++) {
        if(stories[i]._id == storyId) {
          story = stories[i].story;
          break;
        }
      }
      return story;
    };

    
    var buildDiagram = function(stories){

      var storiesEnhanced = stories.slice(0);
      storiesEnhanced.forEach(function(storyEnhanced){
        storyEnhanced.opts.forEach(function(optionEnhanced){
          var story = undefined;
          for (var i = 0; i < stories.length; i++) {
            if(stories[i]._id == optionEnhanced.next) {
              story = stories[i];
              break;
            }
          }
          if (story != undefined) {
            optionEnhanced.number = story.number;
            optionEnhanced.preview = story.preview;
          }          
        })
      });

      var storyKeyArray = [];
      storiesEnhanced.forEach(function(storyEnhanced){
        var storyColor="pink";
        if(storyEnhanced.modifier) {
          storyColor="cyan";
        }
        storyKeyArray.push({key: storyEnhanced.preview, color: storyColor});
      });

      storyLinkArray = [];
      storiesEnhanced.forEach(function(storyEnhanced){
        storyEnhanced.opts.forEach(function(optionEnhanced){
          storyLinkArray.push({from: storyEnhanced.preview, to: optionEnhanced.preview});
        });
      });

      var diagram = new go.Diagram("storyDiagram");
      var $ = go.GraphObject.make;

      diagram.nodeTemplate =
        $(go.Node, "Auto",  
          $(go.Shape, "RoundedRectangle",  
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            { margin: 3 }, 
            new go.Binding("text", "key"))
        );

      diagram.model = new go.GraphLinksModel(storyKeyArray, storyLinkArray);
    };

    // --------------------------------------------------
    // Expose public methods as service API
    // --------------------------------------------------
		return {
      buildDiagram : buildDiagram
	  };
  };

  // --------------------------------------------------
  // Create inventory module
  // --------------------------------------------------
  var module = angular.module("diagramBuilder", []);
  
  // --------------------------------------------------
  // Register inventory service with inventory module
  // --------------------------------------------------
  module.factory("diagramBuilder", diagramBuilder);

}());