import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Shelf from "./Shelf";

class Search extends Component {
  state = {
    value: "",
    booksResult: [],
  };

  updateValue = (e) => {
    this.setState({ value: e.target.value });
    if (e.target.value) {
      this.getBooks(e.target.value);
    } else {
      this.setState({ booksResult: [] });
    }
  };

  getBooks = async (value) => {
    const booksResult = ({ response }) =>
      response.map((element) => BooksAPI.get(element.id));

    try {
      const response = await BooksAPI.search(value.trim());
      console.log(response);

      const books = await Promise.all(booksResult({response}));

      this.setState({ booksResult: books });
    } catch {
      this.setState({ booksResult: [] });
    }
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
              onChange={this.updateValue}
            />
          </div>
        </div>
        <div className="search-books-results" />
        <Shelf
          shelfBooks={this.state.booksResult}
          updateShelf={this.props.updateShelf}
        />
      </div>
    );
  }
}

export default Search;
