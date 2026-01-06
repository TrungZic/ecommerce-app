import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <button
          className="clear-search"
          onClick={() => setSearchTerm('')}
          aria-label="Xóa tìm kiếm"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;