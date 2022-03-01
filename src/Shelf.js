import React, { Component } from "react";
import SingleBook from "./SingleBook";

class Shelf extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.shelfBooks.map((book) => (
          <SingleBook key={book.id} book={book}/>
        ))}
      </ol>
    );
  }
}

export default Shelf;
