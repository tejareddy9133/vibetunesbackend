const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user");
const { authRouter } = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/songs", userRouter);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("Connected to db at port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
