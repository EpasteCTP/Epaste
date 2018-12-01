const express = require('express');
const router = express.Router();


router.use('/post', require('./post'));
router.use('/', require('./home'));


module.exports = router;
