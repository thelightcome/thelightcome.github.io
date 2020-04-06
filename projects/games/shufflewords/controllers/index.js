const Theme = require('../models/themes.js');

function index(req, res, next) {
	Theme.find({}).then((result) => {
		res.render('index', {themes: result});
	});
}

module.exports = index;