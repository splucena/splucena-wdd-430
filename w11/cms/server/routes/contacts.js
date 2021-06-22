var express = require("express");
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contacts");
const { group } = require("console");
var router = express.Router();

// Fetch contacts from database
router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
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

  let groups = [];
  console.log(req.body.group);

  for (let g of groups) {
    groups.push(g.id);
  }

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: groups,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "contact added successfully",
        contact: createdContact,
        _id: createdContact._id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred.",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Contact.findOne({ _id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      Contact.updateOne({ _id: req.params.id }, contact).then((result) => {
        res.status(204).json({
          message: "Contact updated successfully.",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found." },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ _id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(204).json({
          message: "Contact deleted successfully.",
        });
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
