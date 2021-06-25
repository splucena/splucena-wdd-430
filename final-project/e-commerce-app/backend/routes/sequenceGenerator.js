var Sequence = require("../models/sequences");

var maxProductId;
var maxCartId;
var maxCategoryId;
var maxTransactionId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne().exec(function (err, sequence) {
    if (err) {
      return res.status(500).json({
        title: "An error occurred",
        error: err,
      });
    }

    sequenceId = sequence._id;
    maxProductId = sequence.maxProductId;
    maxCategoryId = sequence.maxCategoryId;
    maxCartId = sequence.maxCartId;
    maxTransactionId = sequence.maxTransactionId;
  });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "products":
      maxProductId++;
      updateObject = { maxProductId: maxProductId };
      nextId = maxProductId;
      break;
    case "carts":
      maxCartId++;
      updateObject = { maxCartId: maxCartId };
      nextId = maxCartId;
      break;
    case "categories":
      maxCategoryId++;
      updateObject = { maxCategoryId: maxCategoryId };
      nextId = maxCategoryId;
      break;
    case "transactions":
      maxTransactionId++;
      updateObject = { maxTransactionId: maxTransactionId };
      nextId = maxTransactionId;
      break;
    default:
      return -1;
  }

  Sequence.update({ _id: sequenceId }, { $set: updateObject }, function (err) {
    if (err) {
      console.log("nextId error = " + err);
      return null;
    }
  });

  return nextId;
};

module.exports = new SequenceGenerator();
