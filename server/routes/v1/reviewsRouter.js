const reviewsRouter = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const { AddReviewSchema, UpdateReviewSchema } = require("../../types");
const errorHandler = require("../../utils/errorHandler");

const prisma = new PrismaClient();

reviewsRouter.use(isLoggedIn);

reviewsRouter.post("/add/:bookId", async (req, res, next) => {
  try {
    const newBody = { ...req.body, rating: parseFloat(req.body.rating) };
    const parsedData = AddReviewSchema.safeParse(newBody);
    if (!parsedData.success) {
      return next(errorHandler(411, "Invalid Input"));
    }
    const userId = req.userId;
    const { bookId } = req.params;
    const ifExists = await prisma.reviews.findFirst({
      where: {
        bookId,
        userId,
      },
    });
    if (ifExists) {
      return next(errorHandler(403, "Unauthorized"));
    }
    const newRating = await prisma.reviews.create({
      data: { ...parsedData.data, userId, bookId },
    });
    res.status(200).json({
      message: "Rating Success.",
      id: newRating.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.patch("/update/:reviewId", async (req, res, next) => {
  try {
    let newBody = {};
    if (req.body.feedback) {
      newBody = { ...newBody, feedback: req.body.feedback };
    }
    if (req.body.rating) {
      newBody = { ...newBody, rating: parseFloat(req.body.rating) };
    }
    const parsedData = UpdateReviewSchema.safeParse(newBody);
    if (!parsedData.success) {
      return next(errorHandler(411, "Invalid Input"));
    }
    const userId = req.userId;
    const { reviewId } = req.params;
    const updated = await prisma.reviews.update({
      where: {
        id: reviewId,
        userId,
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

reviewsRouter.delete("/delete/:reviewId", async (req, res, next) => {
  try {
    const userId = req.userId;
    const { reviewId } = req.params;
    const deleted = await prisma.reviews.delete({
      where: {
        id: reviewId,
        userId,
      },
    });
    res.status(200).json({
      deletedId: deleted.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const userId = req.userId;
    const { reviewId } = req.params;
    const review = await prisma.reviews.findFirst({
      where: {
        id: reviewId,
        userId,
      },
      select: { id: true, feedback: true, rating: true },
    });
    res.status(200).json({
      review,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = reviewsRouter;
