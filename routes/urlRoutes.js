const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/', urlController.createShortUrl);
router.get('/:shortUrl', urlController.getLongUrl);

module.exports = router;
