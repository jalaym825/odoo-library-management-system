const { Router } = require('express');
const controller = require('./controller');
const { registerSchema, loginSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT } = require('../../utils/Middleware');

const router = Router();

router.get('/me', verifyJWT, controller.getUser);
router.get('/google', controller.continueWithGoogle);
router.get('/google/callback', controller.googleCallBack);

router.post('/register', validateSchema(registerSchema), controller.register);
router.post('/login', validateSchema(loginSchema), controller.login);
router.post('/logout', verifyJWT, controller.logout);

router.put('/verify/:token', controller.verify);

module.exports = router;