const {
  readProducts,
  createProduct,
  deleteProduct,
  readProductsWithCategory,
  readProductWithSlug,
} = require("../controllers/products.controller");
const { verifyJWT, verifyJWTOptional } = require("../middlewares");

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
    [verifyJWT], // middlewares
    createProduct // llamamos a la funcion del controlador
  );

  app.get("/product", [verifyJWTOptional], readProducts);//ruta para leer todos los productos

  app.post("/product/detail",[verifyJWTOptional], readProductWithSlug)//ruta para leer un producto por su slug

  app.post("/productsByCategory",[verifyJWTOptional], readProductsWithCategory )//ruta para leer todos los productos de una categoria

  app.delete("/product", [verifyJWT], deleteProduct);//ruta para borrar un producto
};

