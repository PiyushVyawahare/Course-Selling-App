const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  price: {
    type: Number,
    require: true,
  },
  imageUrl: String,
  creatorId: mongoose.Schema.Types.ObjectId,
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = {
  courseModel: courseModel,
};
