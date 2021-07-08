const express = require("express");

const {
  productFetch,
  deleteProduct,
  // createProduct,
  updateProduct,
  fetchProduct,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

//=== param middleware (parameter) ====\\
router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error("Product Not Found.");
    error.status = 404;
    next(error);
  }
});

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// List Route
router.get("/", productFetch);

// Delete Route
router.delete("/:productId", deleteProduct);

// Create Route
//router.post("/", upload.single("image"), createProduct);

// Update Route
router.put("/:productId", upload.single("image"), updateProduct);

module.exports = router;
