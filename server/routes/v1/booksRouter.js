const { AddBookSchema, EditBookSchema } = require("../../types");
const errorHandler = require("../../utils/errorHandler");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const booksRouter = require("express").Router();

// middleware to authenticate
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
        isbn: parsedData.data.isbn,
      },
    });
    if (ifExists) {
      return next(errorHandler(403, "Book already Exists"));
    }
    const newBook = await prisma.book.create({
      data: {
        title: parsedData.data.title,
        author: parsedData.data.author,
        isbn: parsedData.data.isbn,
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
  const userId = req.userId;
  const { search, sortBy = "createdAt", order = "asc", genre } = req.query;

  let sortField;

  if (sortBy === "rating") {
    sortField = { reviews: { _avg: { rating: order } } };
  } else {
    sortField = { [sortBy]: order };
  }

  try {
    // Build the search filter
    const searchFilter = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { author: { contains: search, mode: "insensitive" } },
            { isbn: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Build the genre filter
    const genreFilter = genre ? { genre } : {};

    // Build the user filter
    const userFilter = userId ? { userId } : {};

    // Fetch books with combined filters
    const books = await prisma.book.findMany({
      where: {
        AND: [searchFilter, genreFilter, userFilter],
      },
      orderBy: sortField,
      include: {
        reviews: {
          select: { rating: true, feedback: true, id: true },
        },
      },
    });

    // Fetch all reviews for books with the same ISBNs
    const isbns = books.map((book) => book.isbn);
    const reviewsForIsbns = await prisma.reviews.findMany({
      where: { book: { isbn: { in: isbns } } },
      include: { book: { select: { isbn: true } } },
    });

    // Calculate average ratings
    const isbnRatingMap = reviewsForIsbns.reduce((acc, review) => {
      const isbn = review.book.isbn;
      if (!acc[isbn]) acc[isbn] = [];
      acc[isbn].push(review.rating);
      return acc;
    }, {});

    const avgRatings = Object.fromEntries(
      Object.entries(isbnRatingMap).map(([isbn, ratings]) => {
        const avg =
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return [isbn, avg];
      })
    );

    // Attach average ratings to books
    const booksWithRatings = books.map((book) => ({
      ...book,
      avgRating: avgRatings[book.isbn] || 0,
    }));

    res.status(200).json({ books: booksWithRatings });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

booksRouter.get("/rec", async (req, res, next) => {
  try {
    const userId = req.userId;
    const books = await prisma.book.findMany({
      where: {
        userId: userId,
      },
    });
    const ISBNs = books.map((book) => book.isbn);
    const newBooks = await prisma.book.findMany({
      where: {
        AND: [{ userId: { not: userId } }, { isbn: { notIn: ISBNs } }],
      },
      take: 10,
    });

    const isbnForRating = newBooks.map((book) => book.isbn);
    const reviewsForIsbns = await prisma.reviews.findMany({
      where: { book: { isbn: { in: isbnForRating } } },
      include: { book: { select: { isbn: true } } },
    });

    // Calculate average ratings
    const isbnRatingMap = reviewsForIsbns.reduce((acc, review) => {
      const isbn = review.book.isbn;
      if (!acc[isbn]) acc[isbn] = [];
      acc[isbn].push(review.rating);
      return acc;
    }, {});

    const avgRatings = Object.fromEntries(
      Object.entries(isbnRatingMap).map(([isbn, ratings]) => {
        const avg =
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return [isbn, avg];
      })
    );

    // Attach average ratings to books
    const booksWithRatings = newBooks.map((book) => ({
      ...book,
      avgRating: avgRatings[book.isbn] || 0,
    }));

    res.status(200).json({
      books: booksWithRatings,
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
