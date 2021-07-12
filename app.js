const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./API/product/routes");
const bakeryRoutes = require("./API/bakery/routes");
const userRoutes = require("./API/user/routes");

//DATEBASE
const db = require("./db/models/index");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Product Routes ===============\\
app.use("/products", productRoutes);
app.use("/bakeries", bakeryRoutes);
app.use(userRoutes);
app.use("/media", express.static("media"));

//========== Error Handling Middleware ==========\\
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "internal Server Error." });
});

//=========Path Not Found===========\\
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found." });
});

//===============================\\
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection successful");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch {
    console.error(error);
  }
};
run();
//------------------
/*
//--------- List Route---------------\\
app.get("/products", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(products);
});

// ----------- Delete Route -----------\\
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

//------------ Create Route------------\\
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

  // .push() newCookie onto cookies
  products.push(newProducts);
  // response: 201 CREATED
  res.status(201).json(newProducts);
});

//--------------- Update Route --------------\\
app.put("/products/:productId", (req, res) => {
  const { productId } = req.params;
  // check if product exists
  const foundProduct = products.find((product) => product.id === +productId);

  // if product exists:
  if (foundProduct) {
    // update product
    for (const key in req.body) foundProduct[key] = req.body[key];
    foundProduct.slug = slugify(foundProduct.name, { lower: true });
    res.status(204).end();
  } else {
    //  give back response 404 product Not Found
    res.status(404).json({ message: "Product Not Found." });
  }
});
*/
