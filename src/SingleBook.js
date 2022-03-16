import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class SingleBook extends Component {

  updateShelf = (e) => {
    const newShelf = e.target.value;
    BooksAPI.update(this.props.book, newShelf);
    this.props.updateShelf(this.props.book, newShelf);
  };

  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${
                  book.imageLinks
                    ? book.imageLinks.smallThumbnail
                    : "https://via.placeholder.com/128x193?text=No%20Cover"
                }")`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf}
                onChange={this.updateShelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : ""}
          </div>
        </div>
      </li>
    );
  }
}

export default SingleBook;
