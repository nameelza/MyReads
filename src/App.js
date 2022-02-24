import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

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
            element={(
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {/* loop over state */}
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Heading</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            <li>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={{
                                      width: 128,
                                      height: 193,
                                      backgroundImage:
                                        'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
                                    }}
                                  />
                                  <div className="book-shelf-changer">
                                    <select>
                                      <option value="move" disabled>
                                        Move to...
                                      </option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ol>
                        </div>
                      </div>
                    {/* close tag */}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )}
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
