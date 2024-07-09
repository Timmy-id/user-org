const { Router } = require('express');
const { register, login } = require('./auth.controller');
const validator = require('../../middlewares/validator.middleware');
const { registerSchema, loginSchema } = require('./auth.schema');

const router = Router();

router.post('/register', validator(registerSchema), register);
router.post('/login', validator(loginSchema), login);

module.exports = router;
