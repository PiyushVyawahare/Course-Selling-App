const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).send({ error: "User not authorized" });

  const payload = jwt.verify(token, process.env.JWT_ADMIN_KEY);

  if (payload) {
    req.userId = payload._id;
    next();
  } else return res.status(401).send({ error: "User not authorized" });
};

module.exports = {
  adminMiddleware: adminMiddleware,
};
