const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/search', controller.searchBooks);
router.get('/:isbn', controller.getBook);
router.get('/', controller.getBooks);

module.exports = router;