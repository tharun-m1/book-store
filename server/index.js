const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/v1/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  return res.status(status).json({
    status: status,
    message: message,
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
