const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userRouter } = require("./routers/user");
const { courseRouter } = require("./routers/course");
const { adminRouter } = require("./routers/admin");
require("./db/db");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(process.env.SERVER_PORT);
