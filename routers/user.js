const { Router } = require("express");
const { userModel } = require("../db/models/user");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  console.log("In login");
  res.status(200).end();
});

userRouter.post("/signup", async (req, res) => {
  console.log("In Signup");
  res.status(200).end();
});

userRouter.get("/purchases", async (req, res) => {
  console.log("In purchases");
  res.status(200).end();
});

module.exports = {
  userRouter: userRouter,
};
