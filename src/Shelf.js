import React from "react";
import SingleBook from "./SingleBook";

const Shelf = ({shelfBooks, updateShelf}) => {
  return (
    <ol className="books-grid">
      {shelfBooks.map((book) => (
        <SingleBook
          key={book.id}
          book={book}
          updateShelf={updateShelf}
        />
      ))}
    </ol>
  );
};

export default Shelf;
