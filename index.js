const express = require("express");
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routers/user");
const { courseRouter } = require("./routers/course");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

app.listen(process.env.SERVER_PORT);
