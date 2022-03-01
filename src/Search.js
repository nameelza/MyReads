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
    console.log("value state", this.state.value)
    this.getBooks(value);
  };

  getBooks = (value) => {
    BooksAPI.search(value).then((books) => {
      console.log("BOOKS", books);
      if (books.error === 'empty query' || books === undefined) {
          this.setState({booksResult: []})
          console.log("empty query")
      } else {
        this.setState({ booksResult: books });
      }
      console.log("BOOKS STATE", this.state.booksResult);
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
        {this.state.booksResult.length !== 0 ? (
          <Shelf shelfBooks={this.state.booksResult} />
        ) : (
          <Shelf shelfBooks={[]} />
        )}
      </div>
    );
  }
}

export default Search;
