const mongoose = require('mongoose');
const Theme = require('../models/themes.js');

function addtheme(req, res, next) {
	const theme = new Theme({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.value.toLowerCase()
	});

	theme.save(function(err) {
		res.end(JSON.stringify(theme));
	});
}

module.exports = addtheme;