import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

function getName(str) {
  switch (str) {
    case "dd":
      return "Currently Reading";
    case "ddd":
      return "Want to read";
    case "read":
      return "Read";
    default:
      return null;
  }
}

function AllBooks({books}) {
  console.log("allBooks Component", books);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(books).map((shelf) => (
            <div className="bookshelf">
              <h2 className="bookshelf-title">{getName(shelf)}</h2>
              <Shelf shelfBooks={books} />
            </div>
          ))}
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

export default AllBooks;
