const express = require('express');
const app = express();

app.use(express.json());

// Sample data for books
let books = {
  "9781593275846": {
    isbn: "9781593275846",
    title: "Eloquent JavaScript, Third Edition",
    author: "Marijn Haverbeke",
    reviews: "A great book for learning JavaScript."
  },
  "9781449331818": {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    reviews: "A comprehensive guide to design patterns in JavaScript."
  },
  "9781449365035": {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    reviews: "A guide to JavaScript fundamentals and beyond."
  },
  "9781491950296": {
    isbn: "9781491950296",
    title: "Programming JavaScript Applications",
    author: "Eric Elliott",
    reviews: "A book on building scalable JavaScript applications."
  }
};

// In-memory array to store users
let users = [];

/**
 * Task 1: Get the book list available in the shop.
 */
app.get('/books', (req, res) => {
  res.json(books);
});

/**
 * Task 2: Get the books based on ISBN.
 */
app.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/**
 * Task 3: Get all books by Author.
 */
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.values(books).filter(book => book.author.toLowerCase() === author);
  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ message: 'No books found by this author' });
  }
});

/**
 * Task 4: Get all books based on Title.
 */
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.values(books).filter(book => book.title.toLowerCase().includes(title));
  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ message: 'No books found with this title' });
  }
});

/**
 * Task 5: Get book Review.
 */
app.get('/books/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.json({ reviews: book.reviews });
  } else {
    res.status(404).json({ message: 'Review not found for this book' });
  }
});

/**
 * Task 6: Register New user.
 */
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Register the new user
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully' });
});

/**
 * Task 7: Login as a Registered user.
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
