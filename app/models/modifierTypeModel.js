var mongoose = require('mongoose');

var ModifierTypeSchema = new mongoose.Schema({
		value: { type: Number, default : 0 },
		text: { type: String, default : ""  }
	}, { collection: 'modifierTypes' });

module.exports.ModifierTypeModel = mongoose.model('ModifierType', ModifierTypeSchema);