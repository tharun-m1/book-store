import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { genreOptions, orderOptions, sortByOptions } from "./options";
import toast from "react-hot-toast";
import { GetBooks } from "../api/book";
import { useDispatch } from "react-redux";
import { set_books } from "../redux/bookStoreSlice";

function SearchFilters() {
  const [search, setSearch] = useState("");
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [genre, setGenre] = useState(null);

  const debounce = (func, delay) => {
    return function (...args) {
      const context = this;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  const handleChange = async (e) => {
    try {
      setSearch(e.target.value);
      const books = await GetBooks(e.target.value);
      dispatch(set_books(books));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const debouncedSearch = debounce(handleChange, 500);

  const fetchBooks = async () => {
    try {
      const books = await GetBooks(search, sortBy, order, genre);
      dispatch(set_books(books));
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) return toast.error("Server error");
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, sortBy, order, genre]);

  return (
    <div className="md:flex md:gap-2">
      <div className="mt-2 md:flex-1">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e);
          }}
          value={search}
          type="text"
          placeholder="Search..."
          className="border border-gray-300 w-full h-full p-1 rounded-md px-2 focus:outline-none"
        />
      </div>
      {/* filters */}
      <div className="flex gap-1 justify-between mt-2 md:flex-1">
        {/* SortBy */}
        <Select
          value={sortByOptions.find((op) => op.value === sortBy)}
          onChange={(selectedOption) => setSortBy(selectedOption.value)}
          options={sortByOptions}
          className="flex-1"
          placeholder={"Sort by"}
        />
        {/* Order */}
        <Select
          value={orderOptions.find((op) => op.value === order)}
          onChange={(selectedOption) => setOrder(selectedOption.value)}
          options={orderOptions}
          className="flex-1"
          placeholder={"Order"}
        />
        {/* genre */}
        <Select
          value={genreOptions.find((op) => op.value === genre)}
          onChange={(selectedOption) => setGenre(selectedOption.value)}
          options={genreOptions}
          className="flex-1"
          placeholder="Genre"
        />
      </div>
    </div>
  );
}

export default SearchFilters;
