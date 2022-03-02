import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class SingleBook extends Component {
  state = {
    book: {},
    shelf: ""
  };

  componentDidMount() {
      BooksAPI.get(this.props.book.id).then((book) => {
        this.setState({book: book, shelf: book.shelf});
      });
  }

  handleChange = (event) => {
    this.updateShelf(event.target.value);
    this.setState({shelf: event.target.value});
    console.log("changed", this.state.shelf)
    
  }
  
  updateShelf = (newShelf) => {
    BooksAPI.update(this.state.book, newShelf);
  }

  render() {
    console.log("SingleBookComponentShelf", this.state.shelf)
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  this.props.book.imageLinks.smallThumbnail
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={(event) => this.handleChange(event)}>
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
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}

export default SingleBook;
