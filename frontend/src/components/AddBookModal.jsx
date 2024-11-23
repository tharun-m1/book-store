import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  close_book,
  set_add_rec,
  set_edit_data,
} from "../redux/bookModalSlice";
import { genreOptions } from "./options";
import toast from "react-hot-toast";
import axios from "axios";
import { Upload } from "../api/upload";
import { AddBook, GetBooks, Recommendations, UpdateBook } from "../api/book";
import { set_books, set_recommendations } from "../redux/bookStoreSlice";

function AddBookModal() {
  const dispatch = useDispatch();
  const edit_data = useSelector((state) => state.bookModal.edit_data);
  const rec_data = useSelector((state) => state.bookModal.add_rec);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    image_url: null,
    rating: "",
    feedback: "",
  });
  const fileRef = useRef(null);
  const handleIO = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleFileChange = async (e) => {
    try {
      setImgLoading(true);
      const newFile = e.target.files[0];
      const imageUrl = await Upload(newFile);
      setFormData({ ...formData, image_url: imageUrl });
      toast.success("Image Uploaded");
    } catch (error) {
      toast.error("Unable to upload");
      console.log(error);
    } finally {
      setImgLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCancel = () => {
    dispatch(close_book());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (formData[key] !== null) {
        if (formData[key].toString().trim().length === 0) {
          return toast.error(`Invalid ${key}`);
        }
      } else {
        return toast.error("Image is required");
      }
    }
    if (isNaN(formData?.rating)) {
      return toast.error("Rating should be number 1-5");
    }
    const r = parseFloat(formData?.rating);
    if (r < 0 || r > 5) {
      return toast.error("Rating should be number 1-5");
    }
    try {
      setLoading(true);
      if (edit_data !== null) {
        const res = await UpdateBook(formData, bookId, reviewId);
        const books = await GetBooks();
        dispatch(set_books(books));
        toast.success("Book updated");
        return dispatch(close_book());
      }

      await AddBook(formData);
      const books = await GetBooks();
      dispatch(set_books(books));
      if (rec_data) {
        const rec_books = await Recommendations();
        dispatch(set_recommendations(rec_books));
      }
      toast.success("Book Added");
      return dispatch(close_book());
    } catch (error) {
      console.log(error);
      if (error.response.status === 500)
        return toast.error("Something went wrong");
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (edit_data) {
      const { id, reviewId, ...rest } = edit_data;
      setBookId(id);
      setReviewId(reviewId);
      setFormData({
        title: edit_data?.title,
        author: edit_data?.author,
        isbn: edit_data?.isbn,
        genre: edit_data?.genre,
        image_url: edit_data?.image_url,
        rating: edit_data?.rating,
        feedback: edit_data?.feedback,
      });
    }
    if (rec_data) {
      setFormData({
        title: rec_data?.title,
        author: rec_data?.author,
        isbn: rec_data?.isbn,
        genre: rec_data?.genre,
        image_url: rec_data?.image_url,
        rating: "",
        feedback: "",
      });
    }

    return () => {
      dispatch(set_edit_data(null));
      dispatch(set_add_rec(null));
      setBookId(null);
      setReviewId(null);
    };
  }, []);

  return (
    <div className="modal flex justify-center items-center font-primary">
      <div className="bg-white p-3 rounded-md pb-3 w-[90%] sm:p-4 sm:w-[70%] md:w-[70%] lg:w-[50%] xl:w-[40%]">
        <h3 className="font-bold uppercase text-[1.25rem] text-primary">
          Add Book
        </h3>
        <div className="mt-2 flex flex-col gap-2">
          <div className="w-full">
            <input
              name="title"
              value={formData?.title}
              onChange={handleChange}
              required
              type="text"
              placeholder="Book title..."
              className="w-full border border-slate-300 p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full">
            <input
              name="author"
              value={formData?.author}
              onChange={handleChange}
              required
              type="text"
              placeholder="Author Name..."
              className="w-full border border-slate-300 p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full">
            <input
              name="isbn"
              value={formData?.isbn}
              onChange={handleChange}
              required
              type="text"
              placeholder="ISBN"
              className="w-full border border-slate-300 p-2 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <Select
              value={genreOptions.find((op) => op.value === formData.genre)}
              onChange={(selectedOption) =>
                setFormData({ ...formData, genre: selectedOption.value })
              }
              options={genreOptions} // List of genre options
              placeholder="Genre"
            />
          </div>
          {formData?.image_url && (
            <div className="flex gap-1 items-center mt-2 border border-slate-300 rounded-md p-2 text-primary">
              <button
                onClick={() => setFormData({ ...formData, image_url: null })}
                className="p-1 bg-red-600 rounded-md"
              >
                <IoMdClose size={20} color="white" />
              </button>
              <a
                href={formData?.image_url}
                target="_blank"
                className="line-clamp-1 overflow-ellipsis break-words"
              >
                {formData?.image_url}
              </a>
            </div>
          )}
          {!formData?.image_url && (
            <div>
              <input
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
                className="hidden"
              />
              <button
                disabled={imgLoading}
                onClick={handleIO}
                className={`${
                  imgLoading && "bg-slate-400"
                } w-full bg-primary font-semibold  p-2 rounded-md text-white`}
              >
                {imgLoading ? "Loading..." : "Upload Cover Photo"}
              </button>
            </div>
          )}
          <div className="w-full">
            <input
              name="rating"
              value={formData?.rating}
              onChange={handleChange}
              required
              type="text"
              placeholder="Your rating(1-5)"
              className="w-full border border-slate-300 p-2 rounded-md focus:outline-none"
            />
          </div>
          <div className="w-full">
            <textarea
              name="feedback"
              value={formData?.feedback}
              onChange={handleChange}
              rows={3}
              required
              type="text"
              placeholder="Your Feedback..."
              className="w-full border border-slate-300 p-2 rounded-md focus:outline-none resize-none"
            />
          </div>
          <div className="">
            <div className="flex gap-2 mt-2">
              <button
                disabled={loading}
                onClick={handleCancel}
                className={`${
                  loading && "bg-red-400"
                } flex-1 bg-red-600 p-3 rounded-md text-white`}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`${
                  loading && "bg-slate-400"
                } flex-1 bg-primary p-3 rounded-md text-white font-semibold`}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
