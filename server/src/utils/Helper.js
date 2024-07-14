const {default: axios} = require('axios');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// get books with isbn from google books api
const getBookByISBN = async (isbn) => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const res = await axios.get(apiUrl);
    const data = res.data;
    
    if (data.totalItems === 0) {
        return null;
    }

    const book = data.items[0].volumeInfo;
    return {
        title: book.title,
        authors: book.authors ? book.authors : ['Unknown'],
        publisher: book.publisher || 'Unknown',
        categories: book.categories || [],
    };
};

const generateRandomPassword = () => {
    return crypto.randomBytes(8).toString('hex'); // 16 characters long random password
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

module.exports = {
    getBookByISBN,
    generateRandomPassword,
    hashPassword
}