import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  render() {
    return (
      <>
        <div className="list-books-content">
          <div>
            {Object.keys(this.props.books).map((shelf) => (
              <div className="bookshelf" key={shelf}>
                <h2 className="bookshelf-title">{getName(shelf)}</h2>
                <div className="bookshelf-books">
                  <Shelf
                    shelfBooks={this.props.books[shelf]}
                    updateShelf={this.props.updateShelf}
                  />
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
