import axios from "axios";
import { BASE_URL } from "../config";

const token = JSON.parse(localStorage.getItem("auth"))?.token || null;
const headers = {
  Authorization: token,
  "Content-Type": "application/json",
};
export const AddBook = async (formData) => {
  try {
    const { rating, feedback, image_url, ...rest } = formData;
    const res = await axios.post(
      `${BASE_URL}/books/add`,
      {
        ...rest,
        imgUrl: image_url,
      },
      {
        headers: headers,
      }
    );
    const bookId = res.data.bookId;
    console.log("addBookRes: ", res);
    await axios.post(
      `${BASE_URL}/reviews/add/${bookId}`,
      {
        rating,
        feedback,
      },
      {
        headers: headers,
      }
    );

    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdateBook = async (formData, bookId, reviewId) => {
  try {
    const { rating, feedback, image_url, ...rest } = formData;
    const res = await axios.patch(
      `${BASE_URL}/books/update/${bookId}`,
      {
        ...rest,
        imgUrl: image_url,
      },
      { headers: headers }
    );
    await axios.patch(
      `${BASE_URL}/reviews/update/${reviewId}`,
      {
        rating: rating,
        feedback: feedback,
      },
      { headers: headers }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeleteBook = async (bookId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/books/delete/${bookId}`, {
      headers: headers,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetBooks = async (
  search = "",
  sortBy = "createdAt",
  order = "asc",
  genre = ""
) => {
  try {
    const res = await axios.get(`${BASE_URL}/books`, {
      headers: headers,
      params: { search, sortBy, order, genre },
    });

    return res.data.books;
  } catch (error) {
    throw error;
  }
};

export const Recommendations = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/books/rec`, { headers: headers });
    return res.data.books;
  } catch (error) {
    throw error;
  }
};
