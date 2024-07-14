const { Router } = require('express');
const controller = require('./controller');
const { registerSchema, loginSchema, addLibrarianSchema, deleteLibrarianSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT, isAdmin } = require('../../utils/Middleware');

const router = Router();

router.post('/books', verifyJWT, isAdmin, controller.addBook);
router.delete('/books/:id', verifyJWT, isAdmin, controller.deleteBook);

router.post('/librarians', verifyJWT, isAdmin, validateSchema(addLibrarianSchema), controller.addLibrarian);
router.delete('/librarians', verifyJWT, isAdmin, validateSchema(deleteLibrarianSchema), controller.deleteLibrarian);

module.exports = router;