var mongoose = require('mongoose');

var RiskLevelSchema = new mongoose.Schema({
		value: { type: Number, default : 0 },
		text: { type: String, default : ""  }
	}, { collection: 'riskLevels' });

module.exports.RiskLevelModel = mongoose.model('RiskLevel', RiskLevelSchema);