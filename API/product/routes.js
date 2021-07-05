const express = require("express");

const {
  productFetch,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("./controllers");
const router = express.Router();

// List Route
router.get("/", productFetch);

// Delete Route
router.delete("/:productId", deleteProduct);

// Create Route
router.post("/", createProduct);

// Update Route
router.put("/:productId", updateProduct);

module.exports = router;
