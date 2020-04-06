const Word = require('../models/words.js');

function findword(req, res, next) {
	Word.find({theme: req.body.theme}, 'value').then((result) => {
		res.end(JSON.stringify(result));
	});
}

module.exports = findword;