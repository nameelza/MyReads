import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";

class Search extends Component {
  state = {
    value: "",
    booksResult: [],
  };

  updateValue = (value) => {
    this.setState({ value: value });
    this.getBooks(value);
  };

  getBooks = (value) => {
    BooksAPI.search(value.trim()).then((books) => {
      console.log("BOOKS API", books);
      if (!books || books.error === 'empty query' ) {
          this.setState({booksResult: []});
          console.log("empty query")
      } else {
        console.log("books query");
        this.setState({ booksResult: books });
      }
      console.log("length", this.state.booksResult.length)
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={(event) => this.updateValue(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results" />
        { this.state.booksResult.length !== 0 ? (
          <Shelf shelfBooks={this.state.booksResult} />
        ) : (
          <Shelf shelfBooks={[]} />
        )}
      </div>
    );
  }
}

export default Search;
