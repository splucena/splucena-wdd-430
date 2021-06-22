var express = require("express");
const messages = require("../models/messages");
const Message = require("../models/messages");
var router = express.Router();

router.get("/", (req, res, next) => {
  Message.find()
    .populate("sender")
    .then((messages) => {
      res.status(200).json({
        message: "Messages fetched successfully.",
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred.",
        error: err,
      });
    });
});

module.exports = router;
