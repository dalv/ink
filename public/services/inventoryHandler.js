// --------------------------------------------------
// Inventory Service
// --------------------------------------------------
(function() {

  var inventoryHandler = function(dataAccess) {

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
    // Build inventory list from id list
    // --------------------------------------------------
    var buildInventoryList = function(storyIdList) {
      var inventoryList = [];
      var storyIdListJson = JSON.stringify(storyIdList);
      
      dataAccess.getTest();

      dataAccess.getStoryList(storyIdListJson).then(function(storyList){
          if (storyList != undefined && storyList != "") {
            storyList.forEach(function(story){
            var newInventoryItem = buildInventoryItem(story);
            if(inventoryList.indexOf(newInventoryItem) == -1){
              inventoryList.push(newInventoryItem);
            }
          });
        }
      });

      return inventoryList;
    };

    // --------------------------------------------------
    // Append inventory item to existing inventory list
    // --------------------------------------------------
    var appendToInventory = function(inventoryList, story, storyIdList){
      var storyIdListMinusCurrent = [];

      if (storyIdList[storyIdList.length - 1] == story._id){
        storyIdListMinusCurrent = storyIdList.slice(0, storyIdList.length - 1);
      } else {
        storyIdListMinusCurrent = storyIdList.slice(0);
      }

      if (storyIdListMinusCurrent.indexOf(story._id) == -1) {
        var newInventoryItem = buildInventoryItem(story);
        if (newInventoryItem!=null) {
          inventoryList.push(newInventoryItem);
        }
      }
    }

    // --------------------------------------------------
    // Expose public methods as service API
    // --------------------------------------------------
		return {
      buildInventoryItem : buildInventoryItem,
      buildInventoryList : buildInventoryList,
      appendToInventory : appendToInventory
	  };
  };

  // --------------------------------------------------
  // Create inventory module
  // --------------------------------------------------
  var module = angular.module("inventoryHandler", ["dataAccess"]);
  
  // --------------------------------------------------
  // Register inventory service with inventory module
  // --------------------------------------------------
  module.factory("inventoryHandler", inventoryHandler);

}());