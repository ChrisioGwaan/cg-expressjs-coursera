const express = require("express");
const app = express();

app.use(express.json());

let books = {
  9781593275846: {
    isbn: "9781593275846",
    title: "Eloquent JavaScript, Third Edition",
    author: "Marijn Haverbeke",
    reviews: {},
  },
  9781449331818: {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    reviews: {},
  },
  9781449365035: {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    reviews: {},
  },
  9781491950296: {
    isbn: "9781491950296",
    title: "Programming JavaScript Applications",
    author: "Eric Elliott",
    reviews: {},
  },
};

let users = [];

/**
 * Task 1
 */
app.get("/books", (req, res) => {
  res.json(books);
});

/**
 * Task 2
 */
app.get("/books/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * Task 3
 */
app.get("/books/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const results = Object.values(books).filter(
    (book) => book.author.toLowerCase() === author
  );
  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ message: "No books found by this author" });
  }
});

/**
 * Task 4
 */
app.get("/books/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const results = Object.values(books).filter((book) =>
    book.title.toLowerCase().includes(title)
  );
  if (results.length > 0) {
    res.json(results);
  } else {
    res.status(404).json({ message: "No books found with this title" });
  }
});

/**
 * Task 5
 */
app.get("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    if (Object.keys(book.reviews).length > 0) {
      res.json(book.reviews);
    } else {
      res.json({ message: "No reviews found for this book" });
    }
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 * Task 6
 */
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.status(201).json({ message: "User registered successfully" });
});

/**
 * Task 7
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

/**
 * Task 8
 */
app.put("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username, review } = req.body;

  if (!username || !review) {
    return res
      .status(400)
      .json({ message: "Username and review are required" });
  }

  const registeredUser = users.find((user) => user.username === username);
  if (!registeredUser) {
    return res.status(401).json({ message: "User not registered" });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.reviews[username] = review;
  res.json({
    message: "Review added/modified successfully",
    reviews: book.reviews,
  });
});

/**
 * Task 9
 */
app.delete("/books/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const registeredUser = users.find((user) => user.username === username);
  if (!registeredUser) {
    return res.status(401).json({ message: "User not registered" });
  }

  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.reviews[username]) {
    delete book.reviews[username];
    res.json({ message: "Review deleted successfully", reviews: book.reviews });
  } else {
    res.status(404).json({ message: "Review not found for this user" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
