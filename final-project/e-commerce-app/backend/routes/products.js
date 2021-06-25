var express = require("express");
const Product = require("../models/products");
const sequenceGenerator = require("./sequenceGenerator");

var router = express.Router();

// Fetch products
router.get("/", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({
        message: "Successful!",
        products: products,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred.",
        error: error,
      });
    });
});

// Save product
router.post("/", (req, res, next) => {
  const maxProductId = sequenceGenerator.nextId("products");

  const product = new Product({
    id: maxProductId,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    category: req.body.category,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json({
        message: "Product added successfully.",
        product: createdProduct,
        id: createdProduct.id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred.",
        error: error,
      });
    });
});

// Update product
router.put("/:id", (req, res, next) => {
  Product.findOne({ id: req.params.id }).then((product) => {
    console.log(product);
    product.name = req.body.name;
    product.description = req.body.description;
    product.imageUrl = req.body.imageUrl;
    product.price = req.body.price;
    product.category = req.body.category;

    Product.updateOne({ id: req.params.id }, product)
      .then((result) => {
        res.status(204).json({
          message: "Updated product successfully.",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Product not found",
          error: error,
        });
      });
  });
});

router.delete("/:id", (req, res, next) => {
  Product.findOne({ id: req.params.id })
    .then((product) => {
      Product.deleteOne({ id: req.params.id }).then((result) => {
        res.status(204).json({
          message: "Product deleted successfully.",
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
