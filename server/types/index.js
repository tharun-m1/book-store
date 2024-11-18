const { z } = require("zod");

const SignupSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

module.exports = {
  SignupSchema,
  LoginSchema,
};
