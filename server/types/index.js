const { z } = require("zod");

// Using zod to validate input data

const SignupSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const AddBookSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  isbn: z.string().min(3),
  genre: z.string().min(3),
  imgUrl: z.string().min(3),
});

const EditBookSchema = z.object({
  title: z.string().min(3).optional(),
  author: z.string().min(3).optional(),
  isbn: z.string().min(3).optional(),
  genre: z.string().min(3).optional(),
  imgUrl: z.string().min(3).optional(),
});

const DeleteBookSchema = z.object({
  bookId: z.string(),
});

const GetBookSchema = z.object({
  bookId: z.string(),
});

const AddReviewSchema = z.object({
  feedback: z.string().min(2),
  rating: z.number().nonnegative().gte(1).lte(5),
});

const UpdateReviewSchema = z.object({
  feedback: z.string().min(2).optional(),
  rating: z.number().nonnegative().gte(1).lte(5).optional(),
});
module.exports = {
  SignupSchema,
  LoginSchema,
  AddBookSchema,
  EditBookSchema,
  DeleteBookSchema,
  GetBookSchema,
  AddReviewSchema,
  UpdateReviewSchema,
};
