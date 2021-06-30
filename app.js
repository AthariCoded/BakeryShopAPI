const express = require("express");
let products = require("./products");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Product Routes ===============\\
// List Route
app.get("/products", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(products);
});

// Delete Route
app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  // check if product exists
  //products = products.filter((product) => product.id !== +productId);
  const foundProduct = products.find((product) => product.id === +productId);

  // if product exists:
  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end(); // NO Content
  } else {
    //  give back response 404 product Not Found
    res.status(404).json({ message: "Product Not Found." });
  }
});

// Create Route
app.post("/products", (req, res) => {
  // generate ID
  const id = products.length + 1;
  // generate slug (using slugify)
  const slug = slugify(req.body.name, { lower: true });
  // put them all together with req.body in a new product object (newProduct)
  const newProduct = {
    id,
    slug,
    ...req.body,
  };
  // .push() newProduct onto products
  products.push(newProduct);
  // response: 201 CREATED
  res.status(201).json(newProduct);
});

// Update Route
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
