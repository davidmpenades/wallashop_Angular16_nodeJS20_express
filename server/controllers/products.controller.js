const mdb = require("../models");
const asyncHandler = require("express-async-handler");

// requerir el modelo de Product en la base de datos
const Product = mdb.product;

// requerir el modelo de category en la base de datos
const Category = mdb.category;

const User = mdb.user;

// creamos la funcion de crear product
createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, imgs, category } = req.body;
  const owner = req.userId;

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
    owner,
  });

  await foundCategory.addProduct(product._id);
  return res.status(200).json({
    product: await product.toProductResponse(),
  });
});

// Read All Products
readProducts = asyncHandler(async (req, res) => {
  const {
    text = null,
    price_min = 0,
    price_max = 0,
    offset = 0,
    limit = 8,
    category = null,
  } = req.query;

  let query = {
    $and: [
      {
        price: {
          $gte: price_min,
        },
      },
    ],
  };

  if (parseInt(price_min) < parseInt(price_max)) {
    query.$and.push({ price: { $lte: price_max } });
  }

  if (text) {
    query.$or = [
      {
        title: {
          $regex: text,
        },
      },
      {
        description: {
          $regex: text,
        },
      },
    ];
  }

  if (category) {
    query.category = category;
  }
  const readProducts = await Product.find(query)
    .limit(limit)
    .skip(offset)
    .exec();
  const readProductsCount = await Product.find(query).countDocuments();

  if (!readProducts) {
    return res.status(401).json({
      message: "Product Not Found",
    });
  }
  return res.status(200).json({
    products: await Promise.all(
      readProducts.map(async (product) => {
        const user = await User.findOne({ _id: product.owner });
        return await product.toProductResponse(
          req.loggedin ? req.userId : false,
          user ? await user.toUserResponse() : false
        );
      })
    ),
    total_products: readProductsCount,
  });
});

readProductWithSlug = asyncHandler(async (req, res) => {
  const { slug } = req.body;
  const product = await Product.findOne({ slug }).exec();
  if (!product) {
    return res.status(401).json({
      message: "Product not found!",
    });
  }
  const user = await User.findOne({ _id: product.owner });

  return res
    .status(200)
    .json(
      await product.toProductResponse(
        req.loggedin ? req.userId : false,
        user ? await user.toUserResponse(false) : false
      )
    );
});

//
readProductsWithCategory = asyncHandler(async (req, res) => {
  const { slug } = req.body;
  const category = await Category.findOne({ slug }).exec();
  if (!category) {
    return res.status(401).json({
      message: "Category not found!",
    });
  }

  return await res.status(200).json(
    await Promise.all(
      category.products.map(async (productSlug) => {
        const productObj = await Product.findById(productSlug).exec();
        const user = await User.findOne({ _id: productObj.owner });

        const res = await productObj.toProductResponse(
          req.loggedin ? req.userId : false,
          user ? await user.toUserResponse(false) : false
        );
        return res;
      })
    )
  );
});

// Eliminar producto
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

likeOrUnLikeProduct = asyncHandler(async (req, res) => {
  const { slug } = req.body;
  const userId = req.userId;
  try {
    // Find the product by its slug
    const product = await Product.findOne({ slug }).exec();
    if (!product) {
      return res.status(401).json({
        message: "Product not found!",
      });
    }

    (await product.likes.includes(userId)) // Verifica si el userId esta dentro de product.likes
      ? await product.unlike(userId) // Si el array de likes contiene el userId
      : await product.like(userId); // Si no esta lo contiene

    // Return updated response with status code and data
    return res.status(200).send({
      success: true,
      message: `You ${
        product.likes.includes(userId) ? "" : "un"
      }liked this product`,
    });
  } catch (error) {
    console.log("Error al intentar dar like o dislike", error);
    return res.status(500).send({
      success: false,
      message: "Ocurrio un error al intentar dar like o dislike",
    });
  }
});

const productController = {
  createProduct,
  readProducts,
  deleteProduct,
  readProductsWithCategory,
  readProductWithSlug,
  likeOrUnLikeProduct,
};
module.exports = productController;
