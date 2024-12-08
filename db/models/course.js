const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    requird: true,
  },
  imageUrl: String,
  creatorId: mongoose.Types.ObjectId,
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = {
  courseModel: courseModel,
};
