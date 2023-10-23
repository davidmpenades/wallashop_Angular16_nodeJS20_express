module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //creamos los metodos
  //creamos un producto
  app.post(
    "/product", // ruta para acceder
    [
      verifyJWT
    ], // middlewares
    createProduct // llamamos a la funcion del controlador
  );
  app.get(
    "/product",
    [
      verifyJWTOptional
    ],
    readProducts
  );

  app.post(
    "/product/detail",
    [
      verifyJWTOptional
    ],
    readProductWithSlug
  )

  app.post(
    "/productsByCategory",
    [
      verifyJWTOptional
    ],
    readProductsWithCategory
  )

  app.delete(
    "/product",
    [
      verifyJWT
    ],
    deleteProduct
  );

  app.post(
    "/product/like",
    [
      verifyJWT
    ],
    likeOrUnLikeProduct
  )
};
