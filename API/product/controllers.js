const { Product, Bakery } = require("../../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};
//================================\\

exports.productFetch = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

//--------------------------------------------\\
/*
exports.createProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
*/
//-----------------------------------------------\\
exports.deleteProduct = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end(); // NO Content
  } catch (error) {
    next(error);
  }
};

//-------------------------------------------\\
exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedProduct = await req.product.update(req.body);
    // res.status(204).end(updatedProduct); // NO Content
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};
