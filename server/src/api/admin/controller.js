const logger = require('../../utils/Logger');
const prisma = require('../../utils/PrismaClient');
const { getBookByISBN } = require('../../utils/Helper');

const addBook = async (req, res, next) => {
    try {
        const { isbn, quantity } = req.body;
        // get the book by isbn from google books api
        const bookData = await getBookByISBN(isbn);
        if (!bookData) {
            logger.warn(`[/admin/addBook] - book not found`);
            logger.debug(`[/admin/addBook] - isbn: ${isbn}`);
            return next({ path: '/admin/addBook', statusCode: 404, message: "Book not found" });
        }

        const existingBook = await prisma.books.findUnique({
            where: {
                isbn,
            }
        });

        if (existingBook) {
            logger.warn(`[/admin/addBook] - book already exists`);
            logger.debug(`[/admin/addBook] - isbn: ${isbn}`);
            return next({ path: '/admin/addBook', statusCode: 400, message: "Book already exists" });
        }

        console.log(bookData.author)
        try {
            await prisma.$transaction(async (_prisma) => {
                // Ensure categories and authors are unique
                const uniqueCategories = [...new Set(bookData.categories)];
                const uniqueAuthors = [...new Set(bookData.authors)];

                // Check and upsert categories
                const categoryPromises = uniqueCategories.map(async (categoryName) => {
                    return _prisma.categories.upsert({
                        where: { name: categoryName },
                        update: {},
                        create: { name: categoryName }
                    });
                });

                // Check and upsert authors
                const authorPromises = uniqueAuthors.map(async (authorName) => {
                    return _prisma.authors.upsert({
                        where: { name: authorName },
                        update: {},
                        create: { name: authorName }
                    });
                });

                // Resolve all promises
                const categoryResults = await Promise.all(categoryPromises);
                const authorResults = await Promise.all(authorPromises);

                // Create the new book and connect categories and authors
                const newBook = await _prisma.books.create({
                    data: {
                        isbn,
                        title: bookData.title,
                        publisher: bookData.publisher,
                        quantity: quantity || 1,
                        current_quantity: quantity || 1,
                        categories: {
                            connect: categoryResults.map(category => ({ sys_id: category.sys_id }))
                        },
                        authors: {
                            connect: authorResults.map(author => ({ sys_id: author.sys_id }))
                        }
                    }
                });

                console.log('New Book:', newBook); // Debugging

                logger.info(`[/admin/addBook] - success - ${newBook.isbn}`);
                logger.debug(`[/admin/addBook] - isbn: ${isbn}`);
                return res.status(200).json({
                    book: newBook,
                    message: "Book added successfully"
                });
            }, { timeout: 10000 });
        } catch (transactionError) {
            console.error('Transaction Error:', transactionError); // Debugging
            return next({ path: '/admin/addBook', statusCode: 400, message: transactionError.message, extraData: transactionError });
        }

    } catch (error) {
        console.error('General Error:', error); // Debugging
        return next({ path: '/admin/addBook', statusCode: 500, message: error.message, extraData: error });
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { isbn } = req.body;

        // Check if the book exists
        const existingBook = await prisma.books.findUnique({
            where: { isbn },
            include: {
                authors: true,
                categories: true
            }
        });

        if (!existingBook) {
            logger.warn(`[/admin/deleteBook] - book not found`);
            logger.debug(`[/admin/deleteBook] - isbn: ${isbn}`);
            return next({ path: '/admin/deleteBook', statusCode: 404, message: "Book not found" });
        }

        // Delete the book
        await prisma.books.delete({
            where: { isbn }
        });

        logger.info(`[/admin/deleteBook] - success - ${isbn}`);
        logger.debug(`[/admin/deleteBook] - isbn: ${isbn}`);
        return res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.error('General Error:', error); // Debugging
        return next({ path: '/admin/deleteBook', statusCode: 500, message: error.message, extraData: error });
    }
};

module.exports = {
    addBook,
    deleteBook
}