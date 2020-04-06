const Word = require('../models/words.js');

function words(req, res, next) {
	console.log(req.body)
	if (!req.body.length) {
		Word.findRandom({}, {}, {limit: 50}, (err, result) => {
			res.end(JSON.stringify(result));
		});
	}
	else {
		Word.findRandom({theme: { $in: req.body }}, {}, {limit: 50}, (err, result) => {
			res.end(JSON.stringify(result));
		});
	}
}

module.exports = words;