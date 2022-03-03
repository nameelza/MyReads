import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";

function getName(str) {
  switch (str) {
    case "currentlyReading":
      return "Currently Reading";
    case "wantToRead":
      return "Want to Read";
    case "read":
      return "Read";
    default:
      return null;
  }
}

class AllBooks extends Component {

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
      <>
        <div className="list-books-content">
          <div>
            {Object.keys(this.state.books).map((shelf) => (
              <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">{getName(shelf)}</h2>
                <div className="bookshelf-books">
                  <Shelf shelfBooks={this.state.books[shelf]} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </>
    );
  }
  
}

export default AllBooks;
