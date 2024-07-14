const { Router } = require('express');
const controller = require('./controller');
const { registerSchema, loginSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT, isAdmin } = require('../../utils/Middleware');

const router = Router();

router.post('/books', verifyJWT, isAdmin, controller.addBook);
router.delete('/books/:id', verifyJWT, isAdmin, controller.deleteBook);

module.exports = router;