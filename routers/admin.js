const { Router } = require("express");
const { adminModel } = require("../db/models/admin");

const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
  console.log("In login");
  res.status(200).end();
});

adminRouter.post("/signup", async (req, res) => {
  console.log("In Signup");
  res.status(200).end();
});

adminRouter.get("/course/bulk", async (req, res) => {
  console.log("In purchases");
  res.status(200).end();
});

adminRouter.post("/course", async (req, res) => {
  console.log("In purchases");
  res.status(200).end();
});

adminRouter.put("/course", async (req, res) => {
  console.log("In purchases");
  res.status(200).end();
});

module.exports = {
  adminRouter: adminRouter,
};
