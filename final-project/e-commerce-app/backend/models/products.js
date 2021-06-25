const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: mongoose.Types.Decimal128 },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Product", productSchema);
