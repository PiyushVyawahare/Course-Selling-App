const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  courseId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
});

const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  purchaseModel: purchaseModel,
};
