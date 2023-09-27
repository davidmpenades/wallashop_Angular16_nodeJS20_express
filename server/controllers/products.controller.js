const mdb = require("../models");
const asyncHandler = require("express-async-handler");

// requerir el modelo de Product en la base de datos
const Product = mdb.product;

// requerir el modelo de category en la base de datos
const Category = mdb.category;

// creamos la funcion de crear product

createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, imgs, category } = req.body;

  // confirmar que recibe todos los datos
  if (!title || !description || !price || !category || !imgs) {
    res.status(400).json({ message: "All fields are required" });
  }

  const foundCategory = await Category.findOne({ slug: category }).exec();

  if (!foundCategory) {
    return res.status(401).json({
      message: "Category not found!! Bequerol",
    });
  }

  // crear product
  const product = await Product.create({
    title,
    description,
    price,
    imgs,
    category: foundCategory.slug,
  });

  await foundCategory.addProduct(product._id);

  return res.status(200).json({
    product: await product.toProductResponse(),
  });
});

readProducts = asyncHandler(async (req, res) => {
  const readProducts = await Product.find().exec();
  if (!readProducts) {
    return res.status(401).json({
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    product: readProducts,
  });
});

deleteProduct = asyncHandler(async (req, res) => {
  const { slug } = req.body;

  const product = await Product.findOne({ slug }).exec();
  if (!product) {
    return res.status(401).json({
      message: "Product Not Found",
    });
  }

  const category = await Category.findOne({ slug: product.category }).exec();
  await category.removeProduct(product._id);
  await product.deleteOne();
  res.status(200).json({
    message: "Product successfully deleted",
  });
});

const productController = {
  createProduct,
  readProducts,
  deleteProduct,
};
module.exports = productController;
