const { Router } = require("express");
const { adminModel } = require("../db/models/admin");
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // do zod validations
    const User = zod.object({
      email: zod.string().email(),
      password: zod.string().min(8).max(12),
      firstName: zod.string().min(2),
      lastName: zod.string().min(2),
    });

    User.parse(data);

    const saltRounds = 10;

    const hashedPass = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPass;

    const savedData = await adminModel.create(data);

    if (!savedData._id) return res.status(400).end();

    return res.status(201).json({ message: "Admin details saved successfully!!!" });
  } catch (e) {
    if (e.name === "ZodError") return res.status(400).send({ error: "Input validation error" });
    return res.status(400).send({ error: e.message });
  }
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;

    // do zod validations
    const User = zod.object({
      email: zod.string().email(),
    });

    User.parse({
      email: email,
    });

    const adminDetails = await adminModel.findOne({ email: email });

    if (!adminDetails?._id) return res.status(401).json({ error: "User doesn't exist" });

    const isPassValid = await bcrypt.compare(password, adminDetails.password);

    if (!isPassValid) return res.status(401).json({ error: "Password is invalid" });

    const jwtPayload = {
      _id: adminDetails._id,
      email: adminDetails.email,
      firstName: adminDetails.firstName,
      lastName: adminDetails.lastName,
    };

    const token = jwt.sign(jwtPayload, "1234", { expiresIn: "10m" });

    return res.status(200).json({ token: token });
  } catch (e) {
    if (e.name === "ZodError") return res.status(400).send({ error: "Input validation error" });
    return res.status(400).send({ error: e.mesaage });
  }
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
