const random = require('mongoose-simple-random');

const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const wordSchema = Schema({
	theme: { type: Schema.Types.ObjectId, ref: 'Theme' },
	value: {
		type: String,
		trim: true,
		unique: true,
		minlength: 2,
		maxlength: 150,
		required: true
	}
});

wordSchema.plugin(random);

const Word = mongoose.model('Word', wordSchema);

module.exports = Word