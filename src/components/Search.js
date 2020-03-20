import React from 'react';

import '../App.css';

const Search = ({ search, handleChange, handleSearch, placeholder }) => (
  <div className="wrap">
    <form onSubmit={handleSearch}>
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder={placeholder}
          onChange={handleChange}
          value={search}
          required
        />
        <input type="submit" className="searchButton" />
      </div>
    </form>
  </div>
);

export default Search;
