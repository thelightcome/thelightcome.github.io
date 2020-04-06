const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const themeSchema = Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		trim: true,
		unique: true,
		minlength: 2,
		maxlength: 60,
		required: true
	},
	words: [{ type: Schema.Types.ObjectId, ref: 'Word' }]
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme