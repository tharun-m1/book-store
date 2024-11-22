import React, { useEffect, useRef, useState } from "react";
import BookCard from "../components/BookCard";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { set_books } from "../redux/bookStoreSlice";
import { GetBooks } from "../api/book";

function Dashboard() {
  const dispatch = useDispatch();
  const recRef = useRef(null);
  const bookRef = useRef(null);
  const books = useSelector((state) => state.bookStore.books);
  const recomendedBooks = Array.from({ length: 0 }, (_, idx) => idx);

  const get_books = async () => {
    try {
      const books = await GetBooks();
      dispatch(set_books(books));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  useEffect(() => {
    get_books();
  }, []);
  return (
    <div className="p-2 h-full flex flex-col">
      {/* <div className="font-primary text-[1.5rem] font-semibold mt-5">
        Welcome, Tharun
      </div> */}
      <div className="mt-3 flex-grow-1 md:flex md:flex-row-reverse md:gap-2 md:items-start">
        {/* Recomendatations Books */}
        {recomendedBooks.length > 0 && (
          <div className="md:w-auto lg:pe-5">
            <div className="font-medium font-primary">Recomended Books</div>
            <div
              ref={recRef}
              className="lg:w-full lg:mx-auto mt-2 flex md:flex-col md:max-h-[60vh] lg:max-h-[75vh] items-center justify-start gap-2 overflow-x-scroll"
            >
              {books.map((book) => (
                <div
                  ref={bookRef}
                  className="w-[260px] flex-shrink-0 shadow-xl"
                >
                  <BookCard status={"rec"} />
                </div>
              ))}
            </div>
          </div>
        )}
        {/* User books */}
        {/* {books?.length > 0 && ( */}
        <div className="flex-1">
          <div className="font-medium font-primary mt-3 md:mt-0">
            Your Books
          </div>
          <div className="max-h-[60vh] md:max-h-[60vh] lg:max-h-[75vh] overflow-y-scroll pb-[250px]">
            <div className="mt-2 flex flex-wrap items-center justify-start gap-2">
              {books?.map((book) => (
                <div
                  ref={bookRef}
                  key={book?.id}
                  className="w-full lg:w-[45%] xl:w-[30%] flex-shrink-0 shadow-xl"
                >
                  <BookCard book={book} status={"own"} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Dashboard;
