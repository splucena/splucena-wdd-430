var express = require("express");
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contacts");
var router = express.Router();

// Fetch contacts from database
router.get("/", (req, res, next) => {
  Contact.find()
    .then((contacts) => {
      res.status(200).json({
        message: "Contacts fetch successfully.",
        contacts: contacts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred.",
        error: err,
      });
    });
});

// Create contact
router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "contact added successfully",
        contact: createdContact,
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
