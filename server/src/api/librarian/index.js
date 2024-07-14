const { Router } = require('express');
const controller = require('./controller');
const { issueBookSchema } = require('../../utils/zodValidators');
const { validateSchema, verifyJWT, isLibrarian } = require('../../utils/Middleware');

const router = Router();

router.post('/issue', verifyJWT, isLibrarian, validateSchema(issueBookSchema), controller.issueBook);
router.post('/return/:id', verifyJWT, isLibrarian, controller.returnBook);

router.get('/issued-books', verifyJWT, isLibrarian, controller.getIssuedBooks);
router.get('/users-issued-books/:email', verifyJWT, isLibrarian, controller.getUsersIssuedBooks);

module.exports = router;