import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf"

class AllBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <Shelf/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <Shelf/>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <Shelf/>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default AllBooks;