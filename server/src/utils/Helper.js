const {default: axios} = require('axios');

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

module.exports = {
    getBookByISBN
}