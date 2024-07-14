const { Router } = require('express');
const controller = require('./controller');
const { registerSchema, loginSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT } = require('../../utils/Middleware');

const router = Router();

router.get('/me', verifyJWT, controller.getUser);

router.post('/register', validateSchema(registerSchema), controller.register);
router.post('/login', validateSchema(loginSchema), controller.login);
router.post('/logout', verifyJWT, controller.logout);

module.exports = router;