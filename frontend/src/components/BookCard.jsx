import React from "react";
import { FaStar } from "react-icons/fa";

function BookCard({ status }) {
  return (
    <div className="bg-white rounded-md p-2 flex gap-2 w-full font-primary">
      {/* Cover Image */}
      <div className="w-[100px] h-[120px] rounded-md overflow-hidden flex-shrink-0">
        <img
          className="w-full object-cover h-full"
          src="https://www.creativindiecovers.com/wp-content/uploads/2012/02/9780718155209.jpg"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold font-primary text-[1rem] line-clamp-1">
          The Last of us fdjfisdo fiosd io
        </p>
        <p className="text-[0.75rem] tracking-wide font-medium line-clamp-1">
          PAUL HOFFMAN
        </p>
        <div className="flex gap-1 items-center justify-start">
          <span>
            <FaStar size={15} color="#FFCA28" />
          </span>
          <span className="text-[0.75rem] font-medium">4.5</span>
        </div>
        {status === "own" && (
          <p className="text-[0.75rem] mt-1">
            Your rating: <span className=" font-medium">4.5</span>
          </p>
        )}
        <div className="mt-auto">
          {status !== "own" && (
            <button className="text-center w-full rounded-md bg-primary hover:bg-blue-800 text-white font-medium py-1">
              Add
            </button>
          )}
          {status === "own" && (
            <div className="flex gap-1 items-center">
              <button className="flex-1 bg-primary py-1 rounded-md text-white font-medium text-[0.875rem]">
                View/Edit
              </button>
              <button className="flex-1 bg-red-600 text-white text-[0.875rem] py-1 rounded-md">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
