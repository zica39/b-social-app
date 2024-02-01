const router = require('express').Router();

router.use('/auth', require('./auth/auth'));
router.use('/profile', require('./profile'));

router.use('/post', require('./post'));
router.use('/like', require('./like'));
router.use('/comment', require('./comment'));
router.use('/follow', require('./follow'));

module.exports = router;