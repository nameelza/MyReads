import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllBooks from "./AllBooks";
import Search from "./Search";

class BooksApp extends React.Component {

  state = {
    books: {}
  }

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
      })
      this.setState({books: inCategories});
    });
  }

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
              element={<AllBooks books={this.state.books}/>}
            />
            <Route
              path="/search"
              element={<Search />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default BooksApp;
