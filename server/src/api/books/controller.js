const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchBooks = async (req, res, next) => {
    try {
        const { query, filter, limit = 10, offset = 0 } = req.query;
        console.log(req.query);
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        let whereClause = {
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { authors: { some: { name: { contains: query, mode: 'insensitive' } } } },
                { categories: { some: { name: { contains: query, mode: 'insensitive' } } } },
                { isbn: { equals: query } }
            ]
        };

        // Apply additional filter if provided
        if (filter) {
            switch (filter.toLowerCase()) {
                case 'title':
                    whereClause = { title: { contains: query, mode: 'insensitive' } };
                    break;
                case 'author':
                    whereClause = { authors: { some: { name: { contains: query, mode: 'insensitive' } } } };
                    break;
                case 'category':
                    whereClause = { categories: { some: { name: { contains: query, mode: 'insensitive' } } } };
                    break;
                case 'isbn':
                    whereClause = { isbn: { equals: query } };
                    break;
                // If an invalid filter is provided, it will use the default OR clause
            }
        }

        const books = await prisma.books.findMany({
            where: whereClause,
            include: {
                authors: true,
                categories: true,
            },
            take: parseInt(limit),
            skip: parseInt(offset),
        });

        const totalCount = await prisma.books.count({
            where: whereClause,
        });

        res.status(200).json({
            books,
            totalCount,
            message: "Books retrieved successfully"
        });
    } catch (error) {
        next({ path: '/books/search', statusCode: 500, message: error.message, extraData: error });
    }
};

module.exports = {
    searchBooks
};