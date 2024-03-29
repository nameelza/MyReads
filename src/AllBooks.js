import React from "react";
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

const AllBooks = ({ books, updateShelf }) => {
  return (
    <>
      <div className="list-books-content">
        <div>
          {Object.keys(books).map((shelf) => (
            <div key={shelf} className="bookshelf">
              <h2 className="bookshelf-title">{getName(shelf)}</h2>
              <div className="bookshelf-books">
                <Shelf
                  shelfBooks={books[shelf]}
                  updateShelf={updateShelf}
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
};

export default AllBooks;
