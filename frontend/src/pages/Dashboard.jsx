import React, { useEffect, useRef, useState } from "react";
import BookCard from "../components/BookCard";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { set_books, set_recommendations } from "../redux/bookStoreSlice";
import { GetBooks, Recommendations } from "../api/book";
import { useNavigate } from "react-router-dom";
import { remove_token } from "../redux/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recRef = useRef(null);
  const bookRef = useRef(null);
  const books = useSelector((state) => state.bookStore?.books);
  const token = useSelector((state) => state.auth?.token);
  const recomendedBooks = useSelector(
    (state) => state.bookStore?.recommendations
  );

  const get_books = async () => {
    try {
      const books = await GetBooks();
      const recommendations = await Recommendations();
      dispatch(set_books(books));
      dispatch(set_recommendations(recommendations));
    } catch (error) {
      if (error.response.data.message === "jwt expired") {
        remove_token();
        navigate("/");
        return toast.error("Session expired");
      }
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      get_books();
    }
  }, [token]);
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
              {recomendedBooks?.map((book) => (
                <div
                  ref={bookRef}
                  key={book.id}
                  className="w-[260px] flex-shrink-0 shadow-xl"
                >
                  <BookCard book={book} status={"rec"} />
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
            {books?.length > 0 ? (
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
            ) : (
              <div className="font-primary text-center text-[1.5rem] mt-[10%] font-semibold">
                No books found, Add to see.
              </div>
            )}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Dashboard;
