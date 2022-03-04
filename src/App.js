import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import AllBooks from "./AllBooks";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    books: {},
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let inCategories = {};
      books.forEach((book) => {
        if (book.shelf !== "none") {
          if (!inCategories[book.shelf]) {
            inCategories[book.shelf] = [];
          }
          inCategories[book.shelf].push(book);
        }
      });
      this.setState({ books: inCategories });
    });
  }

  updateShelf = (book, newShelf) => {
    let books = this.state.books;
    if (book.shelf !== "none") {
      books[book.shelf].splice(books[book.shelf].indexOf(book), 1);
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
            <Route path="/search" element={<Search updateShelf={this.updateShelf}/>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default BooksApp;
