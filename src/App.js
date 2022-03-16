import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import AllBooks from "./AllBooks";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    books: { currentlyReading: [], wantToRead: [], read: [] },
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        if (book.shelf !== "none") {
          this.setState((state) => ({
            books: {
              ...state.books,
              [book.shelf]: [...state.books[book.shelf], book],
            },
          }));
        }
      });
    });
  }

  updateShelf = (book, newShelf) => {
    // Make deep copy of books so that we don't mutate the state
    const books = JSON.parse(JSON.stringify(this.state.books));
    if (book.shelf !== "none") {
      // Remove book from old shelf
      books[book.shelf] = books[book.shelf].filter((b) => b.id !== book.id);
    }

    book.shelf = newShelf;
    if (newShelf !== "none") {
      if (!books[newShelf]) {
        books[newShelf] = [];
      }
      books[newShelf].push(book);
    }
    this.setState({ books: books });
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AllBooks
                  books={this.state.books}
                  updateShelf={this.updateShelf}
                />
              }
            />
            <Route
              path="/search"
              element={<Search updateShelf={this.updateShelf} />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default BooksApp;
