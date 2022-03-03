import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AllBooks from "./AllBooks";
import Search from "./Search";

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Routes>
            <Route
              exact
              path="/"
              element={<AllBooks/>}
            />
            <Route
              path="/search"
              element={<Search />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default BooksApp;
