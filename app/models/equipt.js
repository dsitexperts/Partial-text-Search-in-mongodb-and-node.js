var mongoose = require('mongoose');

var equiptSchema = mongoose.Schema({
	    Code: String,
		Industry: String,
		EquipmentType: String,
		EquipmentName: String,
		Make: String,
		Model: String,
		WorkingCapacity:String,
		photo:String,
		twitter:String
});

module.exports = mongoose.model('Equipt', equiptSchema, 'Equipt');