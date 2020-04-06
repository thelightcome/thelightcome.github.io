const express = require('express'),
	  router = express.Router(),
	  index = require('../controllers/index'),
	  words = require('../controllers/words'),
	  admin = require('../controllers/admin'),
	  addtheme = require('../controllers/addtheme'),
	  addword = require('../controllers/addword'),
	  findword = require('../controllers/findword');

router.get('/admin', admin);
router.post('/addtheme', addtheme);
router.post('/addword', addword);
router.post('/findword', findword);
router.get('/:lang?', index);
router.post('/:lang?/words', words);

module.exports = router;
