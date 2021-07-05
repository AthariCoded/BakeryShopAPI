const { Product } = require("../../db/models");
const slugify = require("slugify");

exports.productFetch = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = (req, res) => {
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
};

exports.createProduct = (req, res) => {
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
};

exports.updateProduct = (req, res) => {
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
};
