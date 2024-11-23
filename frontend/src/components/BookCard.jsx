import React from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { open_delete, set_delete_data } from "../redux/deleteModalSlice";
import { open_book, set_add_rec, set_edit_data } from "../redux/bookModalSlice";

function BookCard({ status, book }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(open_delete());
    dispatch(set_delete_data(book));
  };
  const handleEdit = () => {
    dispatch(open_book());
    const payload = {
      title: book?.title,
      author: book?.author,
      isbn: book?.isbn,
      genre: book?.genre,
      image_url: book?.imgUrl,
      rating: book?.reviews[0]?.rating,
      feedback: book?.reviews[0]?.feedback,
      id: book?.id,
      reviewId: book?.reviews[0]?.id,
    };
    dispatch(set_edit_data(payload));
  };

  const handleAddRecommended = () => {
    dispatch(open_book());
    const payload = {
      title: book?.title,
      author: book?.author,
      isbn: book?.isbn,
      genre: book?.genre,
      image_url: book?.imgUrl,
      rating: "",
      feedback: "",
    };
    dispatch(set_add_rec(payload));
  };
  return (
    <div className="bg-white rounded-md p-2 flex gap-2 w-full font-primary">
      {/* Cover Image */}
      <div className="w-[100px] h-[120px] rounded-md overflow-hidden flex-shrink-0">
        <img className="w-full object-cover h-full" src={book?.imgUrl} />
      </div>
      <div className="flex-grow flex flex-col">
        <p className="font-semibold font-primary text-[1rem] line-clamp-1">
          {book?.title}
        </p>
        <p className="text-[0.75rem] tracking-wide font-medium line-clamp-1">
          {book?.author}
        </p>
        <div className="flex gap-1 items-center justify-start">
          <span>
            <FaStar size={15} color="#FFCA28" />
          </span>
          <span className="text-[0.75rem] font-medium">{book?.avgRating}</span>
        </div>
        {status === "own" && (
          <p className="text-[0.75rem] mt-1">
            Your rating:{" "}
            <span className=" font-medium">{book?.reviews[0]?.rating}</span>
          </p>
        )}
        <div className="mt-auto">
          {status !== "own" && (
            <button
              onClick={handleAddRecommended}
              className="text-center w-full rounded-md bg-primary hover:bg-blue-800 text-white font-medium py-1"
            >
              Add
            </button>
          )}
          {status === "own" && (
            <div className="flex gap-1 items-center">
              {/* <button
                // onClick={handleEdit}
                className="flex-1 hover:bg-blue-800 bg-primary py-1 rounded-md text-white font-medium text-[0.875rem]"
              >
                View
              </button> */}
              <button
                onClick={handleEdit}
                className="flex-1 hover:bg-blue-800 bg-primary py-1 rounded-md text-white font-medium text-[0.875rem]"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 hover:bg-red-500 bg-red-600 text-white text-[0.875rem] py-1 rounded-md"
              >
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
