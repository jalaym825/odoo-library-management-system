const { Router } = require('express');
const controller = require('./controller');
const { registerSchema, loginSchema, addLibrarianSchema, deleteLibrarianSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT, isAdmin } = require('../../utils/Middleware');

const router = Router();

router.post('/books', verifyJWT, isAdmin, controller.addBook);
router.delete('/books/:isbn', verifyJWT, isAdmin, controller.deleteBook);

router.get('/librarians', verifyJWT, isAdmin, controller.getLibrarians);
router.post('/librarians', verifyJWT, isAdmin, validateSchema(addLibrarianSchema), controller.addLibrarian);
router.delete('/librarians', verifyJWT, isAdmin, validateSchema(deleteLibrarianSchema), controller.deleteLibrarian);

router.get('/search-isbn-book/:query', verifyJWT, isAdmin, controller.searchIsbnBook);

module.exports = router;