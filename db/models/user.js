const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel: userModel,
};