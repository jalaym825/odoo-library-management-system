const logger = require('../../utils/Logger');
const prisma = require('../../utils/PrismaClient');
const { getBookByISBN, generateRandomPassword, hashPassword, getBookByTitle } = require('../../utils/Helper');
const mailer = require('../../utils/Mailer');

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

const addLibrarian = async (req, res, next) => {
    try {
        const { email, password, name, avatar } = req.body;

        // Check if a user with the given email already exists
        let user = await prisma.users.findUnique({
            where: { email }
        });

        if (user) {
            // If the user exists, update their role to LIBRARIAN
            const updatedPassword = password ? await hashPassword(password) : user.password;

            user = await prisma.users.update({
                where: { email },
                data: {
                    role: 'LIBRARIAN',
                    name,
                    avatar,
                    password: updatedPassword, // Only update password if provided
                    isPasswordSet: password ? true : user.isPasswordSet, // Update isPasswordSet if password is provided
                    isVerified: true // Ensuring the user is verified
                }
            });
        } else {
            // Generate a random password if not provided
            const randomPassword = password || generateRandomPassword();
            const hashedPassword = await hashPassword(randomPassword);

            // Create a new user and librarian entry
            user = await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: 'LIBRARIAN',
                    name,
                    isPasswordSet: true,
                    isVerified: true,
                    avatar
                }
            });

            logger.info(`Generated password for new librarian: ${randomPassword}`);
        }
        delete user.password;

        await mailer.sendLibrarianAddedEmail(user.email, user.name);

        logger.info(`[/admin/addLibrarian] - success - ${user.email}`);
        return res.status(200).json({
            librarian: user,
            message: "Librarian added/updated successfully"
        });

    } catch (error) {
        return next({ path: '/admin/addLibrarian', statusCode: 500, message: error.message, extraData: error });
    }
};

// Edit an existing librarian
const editLibrarian = async (req, res, next) => {
    try {
        const { userId, email, name, avatar } = req.body;

        // Update the user details
        const updatedUser = await prisma.users.update({
            where: { sys_id: userId },
            data: {
                email,
                name,
                avatar
            }
        });

        logger.info(`[/admin/editLibrarian] - success - ${updatedUser.email}`);
        return res.status(200).json({
            user: updatedUser,
            message: "Librarian details updated successfully"
        });

    } catch (error) {
        console.error('General Error:', error); // Debugging
        return next({ path: '/admin/editLibrarian', statusCode: 500, message: error.message, extraData: error });
    }
};

// Delete a librarian
const deleteLibrarian = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Optionally, delete the user or change their role
        await prisma.users.update({
            where: { sys_id: userId },
            data: { role: 'USER' } // Changing role to USER
        });

        logger.info(`[/admin/deleteLibrarian] - success - ${userId}`);
        return res.status(200).json({
            message: "Librarian deleted successfully"
        });

    } catch (error) {
        console.error('General Error:', error); // Debugging
        return next({ path: '/admin/deleteLibrarian', statusCode: 500, message: error.message, extraData: error });
    }
};

const searchIsbnBook = async (req, res, next) => {
    try {
        const { query } = req.params;

        if(!query) {
            return next({ path: '/admin/searchIsbnBook', statusCode: 400, message: "Query not provided" });
        }
        // search query from google books api

        const book = await getBookByTitle(query);
        
        if (!book) {
            logger.warn(`[/admin/searchIsbnBook] - book not found`);
            logger.debug(`[/admin/searchIsbnBook] - query: ${query}`);
            return next({ path: '/admin/searchIsbnBook', statusCode: 404, message: "Book not found" });
        }

        logger.info(`[/admin/searchIsbnBook] - success - ${query}`);
        return res.status(200).json({
            book,
            message: "Book found successfully"
        });

    } catch (error) {
        console.error('General Error:', error); // Debugging
        return next({ path: '/admin/searchIsbnBook', statusCode: 500, message: error.message, extraData: error });
    }
}

module.exports = {
    addBook,
    deleteBook,
    addLibrarian,
    editLibrarian,
    deleteLibrarian,
    searchIsbnBook
}