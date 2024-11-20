import React, { useRef } from "react";
import BookCard from "../components/BookCard";

function Dashboard() {
  const recRef = useRef(null);
  const bookRef = useRef(null);
  const books = Array.from({ length: 20 }, (_, idx) => idx);
  return (
    <div className="p-2 h-full flex flex-col">
      <div className="font-primary text-[1.5rem] font-semibold mt-5">
        Welcome, Tharun
      </div>
      <div className="mt-3 flex-grow-1 md:flex md:flex-row-reverse md:gap-2 md:items-start">
        {/* Recomendatations Books */}
        <div className="md:w-auto lg:pe-5">
          <div className="font-medium font-primary">Recomended Books</div>
          <div
            ref={recRef}
            className="lg:w-full lg:mx-auto mt-2 flex md:flex-col md:max-h-[60vh] lg:max-h-[70vh] items-center justify-start gap-2 overflow-x-scroll"
          >
            {books.map((book) => (
              <div ref={bookRef} className="w-[260px] flex-shrink-0 shadow-xl">
                <BookCard status={"rec"} />
              </div>
            ))}
          </div>
        </div>
        {/* User books */}
        <div className="flex-1">
          <div className="font-medium font-primary mt-3 md:mt-0">
            Your Books
          </div>
          <div className="max-h-[60vh] md:max-h-[60vh] lg:max-h-[70vh] overflow-y-scroll pb-[100px]">
            <div className="mt-2 flex flex-wrap items-center justify-start gap-2">
              {books.map((book) => (
                <div
                  ref={bookRef}
                  className="w-full lg:w-[45%] xl:w-[30%] flex-shrink-0 shadow-xl"
                >
                  <BookCard status={"own"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
