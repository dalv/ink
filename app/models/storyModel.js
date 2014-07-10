var mongoose = require('mongoose');

var OptionSchema = new mongoose.Schema({
		text: { type: String, default : "" },
		next: { type: mongoose.Schema.Types.ObjectId, default : new mongoose.Types.ObjectId() }
	});

var StorySchema = new mongoose.Schema({
		text : { type: String, default : "" },
		date: { type: Date, default: Date.now },
		opts : [OptionSchema]
	});

module.exports.OptionModel = mongoose.model('Opt', OptionSchema);
module.exports.StoryModel = mongoose.model('Story', StorySchema);