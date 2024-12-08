const { Router } = require("express");
const { courseModel } = require("../db/models/course");
const { purchaseModel } = require("../db/models/purchase");
const { userMiddleware } = require("../middleware/user");

const courseRouter = Router();

courseRouter.post("/purchase/:courseId", userMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;

    const prevPurchased = await purchaseModel.find({
      courseId: courseId,
      userId: userId,
    });

    if (prevPurchased._id) throw new Error("This course is already purchased");

    const bought = await purchaseModel.create({
      courseId: courseId,
      userId: userId,
    });

    if (!bought._id) throw new Error("Error in buying course");

    return res.status(200).send({ message: "Course purchsed successfully!" });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel.find({});

    if (!courses.length) throw new Error("No courses found");

    return res.status(200).json({ courses });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

module.exports = {
  courseRouter: courseRouter,
};
