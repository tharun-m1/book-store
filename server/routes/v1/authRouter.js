const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const errorHandler = require("../../utils/errorHandler");
const { PrismaClient } = require("@prisma/client");
const { SignupSchema, LoginSchema } = require("../../types");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res, next) => {
  try {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
      return next(errorHandler(411, "Invalid Input"));
    }
    const exists = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });
    if (exists) {
      return next(errorHandler(403, "User already exists."));
    }
    const encryptedPassword = await bcrypt.hash(parsedData.data.password, 10);
    await prisma.user.create({
      data: {
        fullname: parsedData.data.fullname,
        password: encryptedPassword,
        email: parsedData.data.email,
      },
    });
    return res.status(200).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsedData = LoginSchema.safeParse(req.body);
    if (!parsedData.success) {
      return next(errorHandler(411, "Invalid Input"));
    }
    const user = await prisma.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }
    const passwordMatched = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );
    if (!passwordMatched) {
      return next(errorHandler(401, "Incorrect Password"));
    }
    const payload = {
      userId: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = authRouter;
