const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mailer = require('../../utils/Mailer');

const issueBook = async (req, res, next) => {
    try {
        const { isbn, email } = req.body;

        const book = await prisma.books.findUnique({
            where: {
                isbn,
            }
        });

        if (!book) {
            return next({ path: '/librarian/issue', statusCode: 404, message: "Book not found" });
        }

        const user = await prisma.users.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return next({ path: '/librarian/issue', statusCode: 404, message: "User not found" });
        }

        if (user.role !== 'USER') {
            return next({ path: '/librarian/issue', statusCode: 400, message: "Only users can be issued books" });
        }

        if (book.current_quantity <= 0) {
            return next({ path: '/librarian/issue', statusCode: 400, message: "No available copies of the book" });
        }

        try {
            const [updatedBook, issuedBook] = await prisma.$transaction(async (prisma) => {
                const updatedBook = await prisma.books.update({
                    where: { isbn },
                    data: { current_quantity: { decrement: 1 } }
                });

                const issuedBook = await prisma.issuedBooks.create({
                    data: {
                        book: {
                            connect: {
                                isbn,
                            }
                        },
                        user: {
                            connect: {
                                email,
                            }
                        },
                        issuedAt: new Date(),
                        dueDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 days from now
                    }
                });

                return [updatedBook, issuedBook];
            });

            await mailer.sendBookIssuedEmail(email, book.title, issuedBook.issuedAt, issuedBook.dueDate);

            res.status(201).json({
                issuedBook,
                message: "Book issued successfully"
            });
        } catch (transactionError) {
            return next({ path: '/librarian/issue', statusCode: 400, message: transactionError.message, extraData: transactionError });
        }
    } catch (error) {
        return next({ path: '/librarian/issue', statusCode: 500, message: error.message, extraData: error });
    }
}

const returnBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const issuedBook = await prisma.issuedBooks.findUnique({
            where: {
                sys_id: id,
            },
            include: {
                book: true,
                user: true,
            }
        });

        if (!issuedBook) {
            return next({ path: '/librarian/return', statusCode: 404, message: "Issued book not found" });
        }

        const today = new Date();
        const finePerDay = 10.0; // Adjust the fine rate as needed
        let fine = 0;

        // Calculate fine if the book is returned after the due date
        if (today > issuedBook.dueDate) {
            const daysLate = Math.ceil((today - issuedBook.dueDate) / (1000 * 60 * 60 * 24));
            fine = daysLate * finePerDay;
        }

        try {
            await prisma.$transaction(async (prisma) => {
                // Update the issued book record with the returned date and fine
                await prisma.issuedBooks.update({
                    where: {
                        sys_id: id,
                    },
                    data: {
                        returned: today,
                        fine: fine,
                    }
                });

                // Increment the book's current_quantity
                await prisma.books.update({
                    where: { sys_id: issuedBook.book.sys_id },
                    data: { current_quantity: { increment: 1 } }
                });
            });

            await mailer.sendBookReturnedEmail(issuedBook.user.email, issuedBook.book.title, issuedBook.issuedAt, issuedBook.dueDate, today, fine);

            res.status(200).json({
                issuedBook,
                fine,
                message: "Book returned successfully"
            });
        } catch (transactionError) {
            return next({ path: '/librarian/return', statusCode: 400, message: transactionError.message, extraData: transactionError });
        }
    } catch (error) {
        next({ path: '/librarian/return', statusCode: 500, message: error.message, extraData: error });
    }
}

const getIssuedBooks = async (req, res, next) => {
    try {
        const issuedBooks = await prisma.issuedBooks.findMany({
            include: {
                book: true,
                user: true,
            }
        });
        console.log(issuedBooks);
        res.status(200).json(issuedBooks);
    } catch (error) {
        next({ path: '/librarian/issued-books', statusCode: 500, message: error.message, extraData: error });
    }
}

const getUsersIssuedBooks = async (req, res, next) => {
    try {
        const { email } = req.params;

        const user = await prisma.users.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return next({ path: '/librarian/users-issued-books', statusCode: 404, message: "User not found" });
        }

        const issuedBooks = await prisma.issuedBooks.findMany({
            where: {
                user: {
                    email,
                }
            },
            include: {
                book: true,
                user: true,
            }
        });

        res.status(200).json(issuedBooks);
    } catch (error) {
        next({ path: '/librarian/users-issued-books', statusCode: 500, message: error.message, extraData: error });
    }
}


module.exports = {
    issueBook,
    returnBook,
    getIssuedBooks,
    getUsersIssuedBooks,
};