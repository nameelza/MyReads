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
    if (value.length > 0) {
      this.getBooks(value);
    }
  };

  getBooks = async (value) => {
    const response = await BooksAPI.search(value.trim());

    const booksResult = () =>
      response.map((element) => BooksAPI.get(element.id));

    try {
      const books = await Promise.all(booksResult());
        this.setState({ booksResult: books });
    } catch (error) {
      console.log("error", error);
      this.setState({ booksResult: [] });
    }
  };

  render() {
    console.log("state", this.state.booksResult);
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
