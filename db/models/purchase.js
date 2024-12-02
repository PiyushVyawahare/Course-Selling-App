const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  courseId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
});

const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  purchaseModel: purchaseModel,
};
