const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

// Task 10
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    console.log('Task 10: Get all books');
    console.log(response.data);
  } catch (error) {
    console.error('Error in getAllBooks:', error.message);
  }
}

// Task 11
function searchByISBN(isbn) {
  axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(response => {
      console.log('Task 11: Search by ISBN');
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error in searchByISBN:', error.response ? error.response.data : error.message);
    });
}

// Task 12
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/books/author/${author}`);
    console.log('Task 12: Search by Author');
    console.log(response.data);
  } catch (error) {
    console.error('Error in searchByAuthor:', error.response ? error.response.data : error.message);
  }
}

// Task 13
function searchByTitle(title) {
  axios.get(`${BASE_URL}/books/title/${title}`)
    .then(response => {
      console.log('Task 13: Search by Title');
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error in searchByTitle:', error.response ? error.response.data : error.message);
    });
}

async function runClient() {
  await getAllBooks();
  searchByISBN("9781593275846");
  await searchByAuthor("Addy Osmani");
  searchByTitle("JavaScript");
}

runClient();
