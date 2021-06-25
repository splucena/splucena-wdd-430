const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  id: { type: String, required: true },
  maxProductId: { type: Number },
  maxCategoryId: { type: Number },
  maxCartId: { type: Number },
  maxTransactionId: { type: Number },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
