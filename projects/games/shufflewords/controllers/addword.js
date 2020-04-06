const mongoose = require('mongoose');
const Word = require('../models/words.js');
const Theme = require('../models/themes.js');
function addword(req, res, next) {
	const word = new Word({
		theme: req.body.theme,
		value: req.body.value.toLowerCase()
	});
	word.save(function(err) {
		res.end(JSON.stringify(word));
	});
}

module.exports = addword;


// const theme = Theme.find({id: req.body.theme}).then((result) => {
// 		console.log(theme)
// 		const word = new Word({
// 			theme: req.body.theme,
// 			value: req.body.value.toLowerCase()
// 		});
// 		word.save(function(err) {
// 			res.end(JSON.stringify(word));
// 		});
// 	});