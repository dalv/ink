var mongoose = require('mongoose');

var OptionSchema = new mongoose.Schema({
		text: { type: String, default : "" },
		next: { type: mongoose.Schema.Types.ObjectId, default : new mongoose.Types.ObjectId() }
	});

var StorySchema = new mongoose.Schema({
		text : 								{ type: String, default : "" },
		number : 							{ type: Number, default : 0 },
		preview : 						{ type: String, default : "" },
		date: 								{ type: Date, default: Date.now },
		opts : 								[OptionSchema],
		bg_img: 							{ type: String, default : "" },
		modifier: 						{ type: Boolean, default : false },
		modifier_text: 				{ type: String, default : "" },
		modifier_desc: 				{ type: String, default : "" },
		modifier_img: 				{ type: String, default : "" },
		redirect: 						{ type: Boolean, default : false },
		redirect_seconds: 		{ type: Number, default : 10 },	
		redirect_to: 		  		{ type: mongoose.Schema.Types.ObjectId, default : new mongoose.Types.ObjectId() },	
		exhaustable: 					{ type: Boolean, default : false },	
		exhaustable_opt_text: { type: String, default : "" },	
		exhaustable_opt_next: { type: mongoose.Schema.Types.ObjectId, default : new mongoose.Types.ObjectId() },
		risk_level: 					{ type: Number, default : 0 }	
	}, { collection: 'stories' });

module.exports.OptionModel = mongoose.model('Opt', OptionSchema);
module.exports.StoryModel = mongoose.model('Story', StorySchema);
