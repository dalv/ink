// --------------------------------------------------
// Inventory Service
// --------------------------------------------------
(function() {

  var inventoryHandler = function() {

    // --------------------------------------------------
    // Build inventory item from story object
    // --------------------------------------------------
    var buildInventoryItem = function(story) {     
      var inventoryItem = null;

      if (story.modifier){
        inventoryItem = {
          text: story.modifier_text,
          desc: story.modifier_desc,
          type: story.modifier_type,
          img: story.modifier_img_fullpath    
        };
      }

      return inventoryItem;
    }; 

    // --------------------------------------------------
    // Expose public methods as service API
    // --------------------------------------------------
		return {
      buildInventoryItem : buildInventoryItem
	  };
  };

  // --------------------------------------------------
  // Create inventory module
  // --------------------------------------------------
  var module = angular.module("inventoryHandler", []);
  
  // --------------------------------------------------
  // Register inventory service with inventory module
  // --------------------------------------------------
  module.factory("inventoryHandler", inventoryHandler);

}());