const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  courseId: { type: mongoose.Types.ObjectId, ref: "course" },
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
});

const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  purchaseModel: purchaseModel,
};
