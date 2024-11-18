const { AddBookSchema, EditBookSchema } = require("../../types");
const errorHandler = require("../../utils/errorHandler");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const booksRouter = require("express").Router();
booksRouter.use(isLoggedIn);

booksRouter.post("/add", async (req, res, next) => {
  try {
    const userId = req.userId;
    const parsedData = AddBookSchema.safeParse(req.body);
    if (!parsedData.success) {
      return next(errorHandler(411, "Invalid Input"));
    }

    // User can add only once
    const ifExists = await prisma.book.findFirst({
      where: {
        userId,
        ISBN: parsedData.data.ISBN,
      },
    });
    if (ifExists) {
      return next(errorHandler(403, "Book already Exists"));
    }
    const newBook = await prisma.book.create({
      data: {
        title: parsedData.data.title,
        author: parsedData.data.author,
        ISBN: parsedData.data.ISBN,
        genre: parsedData.data.genre,
        imgUrl: parsedData.data.imgUrl,
        userId: userId,
      },
    });
    res.status(200).json({
      bookId: newBook.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

booksRouter.delete("/delete/:bookId", async (req, res, next) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;
    const book = await prisma.book.delete({
      where: {
        id: bookId,
        userId: userId,
      },
    });
    res.status(200).json({
      book,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

booksRouter.patch("/update/:bookId", async (req, res, next) => {
  try {
    const parsedData = EditBookSchema.safeParse(req.body);
    if (!parsedData.success) {
      return next(errorHandler(411, "Invalid Input"));
    }
    const userId = req.userId;
    const { bookId } = req.params;
    const updated = await prisma.book.update({
      where: {
        id: bookId,
        userId: userId,
      },
      data: { ...parsedData.data },
    });
    res.status(200).json({
      updated,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

booksRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.userId;
    const books = await prisma.book.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json({
      books,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

booksRouter.get("/:bookId", async (req, res, next) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params;
    const book = await prisma.book.findFirst({
      where: {
        userId,
        id: bookId,
      },
    });
    res.status(200).json({
      book,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = booksRouter;
