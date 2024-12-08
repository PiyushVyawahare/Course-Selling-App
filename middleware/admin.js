const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) return res.status(401).send({ error: "User not authorized" });

  const { exp } = jwt.decode(token);

  if (Date.now() >= exp * 1000) {
    return res.status(401).send({ error: "User token expired!" });
  }

  const payload = jwt.verify(token, process.env.JWT_ADMIN_KEY);

  if (payload) {
    req.userId = payload._id;
    next();
  } else return res.status(401).send({ error: "User not authorized!" });
};

module.exports = {
  adminMiddleware: adminMiddleware,
};
