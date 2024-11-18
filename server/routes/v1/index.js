const router = require("express").Router();
const authRouter = require("./authRouter");
const booksRouter = require("./booksRouter");
const reviewsRouter = require("./reviewsRouter");

router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
