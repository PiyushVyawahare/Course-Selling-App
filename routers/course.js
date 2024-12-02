const { Router } = require("express");
const { courseModel } = require("../db/models/course");

const courseRouter = Router();

courseRouter.get("/preview", async (req, res) => {
  console.log("In course");
  res.status(200).end();
});

module.exports = {
  courseRouter: courseRouter,
};
