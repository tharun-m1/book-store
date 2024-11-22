import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { close_delete, set_delete_data } from "../redux/deleteModalSlice";
import toast from "react-hot-toast";
import { DeleteBook, GetBooks } from "../api/book";
import { set_books } from "../redux/bookStoreSlice";

function DeleteModal() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const book = useSelector((state) => state.deleteModal.item_data);

  const handleCancel = () => {
    dispatch(close_delete());
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await DeleteBook(book.id);
      const books = await GetBooks();
      dispatch(set_books(books));
      toast.success("Book Deleted");
      return dispatch(close_delete());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(set_delete_data(null));
    };
  }, []);
  return (
    <div className="modal flex justify-center items-center font-primary">
      <div className="bg-white p-3 w-[90%] sm:w-[55%] md:w-[50%] lg:w-[45%] xl:w-[35%] rounded-md">
        <div className="text-center text-[1rem] font-bold mt-2">
          Are you sure, you want to delete
        </div>
        <div className="text-center tet-[1.5rem] font-light mt-2 line-clamp-1">
          {book?.title}
        </div>
        <div className="flex gap-2 mt-5">
          <button
            disabled={loading}
            onClick={handleCancel}
            className="flex-1 bg-slate-200 p-3 rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            className={`flex-1 ${
              loading && "bg-red-300"
            } bg-red-600 p-3 rounded-md text-white`}
          >
            {loading ? "Loading..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
