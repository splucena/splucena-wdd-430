var express = require("express");
var mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const messages = require("../models/messages");
const Message = require("../models/messages");
const sequenceGenerator = require("./sequenceGenerator");
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

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: mongoose.Types.ObjectId("60cf0f1d6de71d35cc5e1610"),
  });

  message
    .save()
    .then((createdMessage) => {
      console.log(createdMessage.sender.name);
      res.status(201).json({
        message: "Message added successfully.",
        messages: createdMessage,
        _id: createdMessage._id,
        senderName: createdMessage.sender.name,
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
