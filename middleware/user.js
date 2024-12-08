const jwt = require("jsonwebtoken");
require("dotenv").config();

const userMiddleware = (req, res, next) => {
  const token = req.headers.token;

  const payload = jwt.verify(token, process.env.JWT_USER_KEY);

  if (payload) {
    req.userId = payload._id;
    next();
  } else return res.status(401).send({ error: "User not authorized" });
};

module.exports = {
  userMiddleware: userMiddleware,
};
