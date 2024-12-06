const { Router } = require("express");
const { userModel } = require("../db/models/user");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
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

    const savedData = await userModel.create(data);

    if (!savedData._id) return res.status(400).end();

    return res.status(201).json({ message: "User details saved successfully!!!" });
  } catch (e) {
    if (e.name === "ZodError") return res.status(400).send({ error: "Input validation error" });
    return res.status(400).send({ error: e.message });
  }
});

userRouter.post("/signin", async (req, res) => {
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

    const userDetails = await userModel.findOne({ email: email });

    if (!userDetails?._id) return res.status(401).json({ error: "User doesn't exist" });

    const isPassValid = await bcrypt.compare(password, userDetails.password);

    if (!isPassValid) return res.status(401).json({ error: "Password is invalid" });

    const jwtPayload = {
      _id: userDetails._id,
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
    };

    const token = jwt.sign(jwtPayload, "1234", { expiresIn: "10m" });

    return res.status(200).json({ token: token });
  } catch (e) {
    if (e.name === "ZodError") return res.status(400).send({ error: "Input validation error" });
    return res.status(400).send({ error: e.mesaage });
  }
});

userRouter.get("/purchases", async (req, res) => {
  console.log("In purchases");
  res.status(200).end();
});

module.exports = {
  userRouter: userRouter,
};
