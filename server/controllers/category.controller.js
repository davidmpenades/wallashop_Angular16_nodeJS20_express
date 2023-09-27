const mdb = require("../models");
const asyncHandler = require("express-async-handler");

// requerir el modelo de category en la base de datos
const Category = mdb.category;

// creamos la funcion de crear category

createCategory = asyncHandler(async (req, res) => {
  const { title, img } = req.body;

  // confirmar datos
  if (!title || !img) {
    res.status(400).json({ message: "All fields are required" });
  }

  // crear categoria
  const category = await Category.create({ title, img });

  // guardar en base de datos
  await category.save();

  return res.status(200).json({
    category: await category.toCategoryResponse(),
  });
});

deleteCategory = asyncHandler(async (req, res) => {
  const { slug } = req.body;

  console.log(slug);

  const category = await Category.findOne({slug}).exec();

  console.log(category);

  if (!category) {
    return res.status(401).json({
      message: "Category Not Found",
    });
  }

  await category.deleteOne();
  res.status(200).json({
    message: "Category successfully deleted",
  });
});

readCategories = asyncHandler(async (req, res) => {
  const readCategory = await Category.find().exec();
  if (!readCategory) {
    return res.status(401).json({
      message: "Category Not Found",
    });
  }
  res.status(200).json({
    categories: readCategory,
  });
});
const categoryController = {
  createCategory,
  deleteCategory,
  readCategories,
};
module.exports = categoryController;
