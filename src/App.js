import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import AllBooks from "./AllBooks";

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
      console.log(this.state.books)
    });
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={<AllBooks books={this.state.books}/>}
          />
          <Route
            path="/search"
            element={(
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button className="close-search">Close</button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid" />
                </div>
              </div>
            )}
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
