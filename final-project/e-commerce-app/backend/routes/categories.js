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
        category: createdCategory,
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

// Fetch categorys
router.get("/", (req, res, next) => {
  Category.find()
    .then((categorys) => {
      res.status(200).json({
        message: "Successful!",
        categorys: categorys,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred.",
        error: error,
      });
    });
});

// Save category
router.post("/", (req, res, next) => {
  const maxCategoryId = sequenceGenerator.nextId("categorys");

  const category = new Category({
    id: maxCategoryId,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    category: req.body.category,
  });

  category
    .save()
    .then((createdCategory) => {
      res.status(201).json({
        message: "Category added successfully.",
        category: createdCategory,
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

// Update category
router.put("/:id", (req, res, next) => {
  Category.findOne({ id: req.params.id }).then((category) => {
    console.log(category);
    category.name = req.body.name;
    category.description = req.body.description;

    Category.updateOne({ id: req.params.id }, category)
      .then((result) => {
        res.status(204).json({
          message: "Updated category successfully.",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Category not found",
          error: error,
        });
      });
  });
});

router.delete("/:id", (req, res, next) => {
  Category.findOne({ id: req.params.id })
    .then((category) => {
      Category.deleteOne({ id: req.params.id }).then((result) => {
        res.status(204).json({
          message: "Category deleted successfully.",
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
