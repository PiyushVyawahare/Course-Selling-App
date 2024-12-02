const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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

const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
  adminModel: adminModel,
};
