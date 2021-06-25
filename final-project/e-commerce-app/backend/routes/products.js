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

  console.log(product);

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

module.exports = router;
