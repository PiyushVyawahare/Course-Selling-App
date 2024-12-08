const jwt = require("jsonwebtoken");
require("dotenv").config();

const userMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).send({ error: "User not authorized" });

  const { exp } = jwt.decode(token);

  if (Date.now() >= exp * 1000) {
    return res.status(401).send({ error: "User token expired!" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_USER_KEY);

    if (payload) {
      req.userId = payload._id;
      next();
    } else return res.status(401).send({ error: "User not authorized!" });
  } catch (e) {
    return res.status(400).send({ error: e.message || "User not authorized" });
  }
};

module.exports = {
  userMiddleware: userMiddleware,
};
