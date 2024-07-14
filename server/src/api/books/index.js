const { Router } = require('express');
const controller = require('./controller');
const { registerSchema, loginSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT } = require('../../utils/Middleware');

const router = Router();

router.get('/search', controller.searchBooks);
router.get('/:isbn', controller.getBook);

module.exports = router;