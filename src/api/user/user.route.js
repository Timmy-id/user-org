const { Router } = require('express');
const { auth } = require('../../middlewares/auth.middleware');
const { getUser } = require('./user.controller');

const router = Router();

router.get('/:userId', auth, getUser);

module.exports = router;
