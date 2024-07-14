const authRouter = require('./api/auth/index');
const adminRouter = require('./api/admin/index');
const booksRouter= require('./api/books/index');
const librarianRouter = require('./api/librarian/index');

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/books', booksRouter);
    app.use('/librarian', librarianRouter);
}

module.exports = routes;