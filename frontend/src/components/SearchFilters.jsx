import React, { useRef, useState } from "react";
import Select from "react-select";
import { genreOptions, orderOptions, sortByOptions } from "./options";
import toast from "react-hot-toast";
import { GetBooks } from "../api/book";
import { useDispatch, useSelector } from "react-redux";
import { set_books } from "../redux/bookStoreSlice";

function SearchFilters() {
  const [search, setSearch] = useState("");
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [genre, setGenre] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchBooks = async () => {
    try {
      if (token) {
        const books = await GetBooks(search, sortBy, order, genre);
        dispatch(set_books(books));
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 500) return toast.error("Server error");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchBooks(value);
  };

  const debouncedFetchBooks = debounce((value) => {
    fetchBooks(value);
  }, 500);

  const handleSortByChange = (selectedOption) => {
    setSortBy(selectedOption.value);
    fetchBooks();
  };

  const handleOrderChange = (selectedOption) => {
    setOrder(selectedOption.value);
    fetchBooks();
  };

  const handleGenreChange = (selectedOption) => {
    setGenre(selectedOption.value);
    fetchBooks();
  };

  return (
    <div className="md:flex md:gap-2">
      <div className="mt-2 md:flex-1">
        <input
          onChange={handleSearchChange}
          value={search}
          type="text"
          placeholder="Search..."
          className="border border-gray-300 w-full h-full p-1 rounded-md px-2 focus:outline-none"
        />
      </div>
      {/* Filters */}
      <div className="flex gap-1 justify-between mt-2 md:flex-1">
        {/* SortBy */}
        <Select
          value={sortByOptions.find((op) => op.value === sortBy)}
          onChange={handleSortByChange}
          options={sortByOptions}
          className="flex-1"
          placeholder="Sort by"
        />
        {/* Order */}
        <Select
          value={orderOptions.find((op) => op.value === order)}
          onChange={handleOrderChange}
          options={orderOptions}
          className="flex-1"
          placeholder="Order"
        />
        {/* Genre */}
        <Select
          value={genreOptions.find((op) => op.value === genre)}
          onChange={handleGenreChange}
          options={genreOptions}
          className="flex-1"
          placeholder="Genre"
        />
      </div>
    </div>
  );
}

export default SearchFilters;
