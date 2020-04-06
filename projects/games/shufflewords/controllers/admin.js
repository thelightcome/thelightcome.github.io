const Theme = require('../models/themes.js');

function admin(req, res, next) {
	Theme.find({}).then((result) => {
		res.render('admin', {themes: result});
	});
}

module.exports = admin;