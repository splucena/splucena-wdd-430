var express = require("express");
const Category = require("../models/categories");
const sequenceGenerator = require("./sequenceGenerator");

var router = express.Router();

// Fetch categories
router.get("/", (req, res, next) => {
  Category.find()
    .then((categories) => {
      res.status(200).json({
        message: "Successful!",
        categories: categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// Save category
router.post("/", (req, res, next) => {
  const maxCategoryId = sequenceGenerator.nextId("categories");

  const category = new Category({
    id: maxCategoryId,
    name: req.body.name,
    description: req.body.description,
  });

  category
    .save()
    .then((createdCategory) => {
      res.status(201).json({
        message: "Category added successfully.",
        product: createdCategory,
        id: createdCategory.id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred.",
        error: error,
      });
    });
});

module.exports = router;
