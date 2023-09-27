const {
  readProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/products.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //creamos los metodos
  //creamo una producto
  app.post(
    "/product", // ruta para acceder
    [], // middlewares
    createProduct // llamamos a la funcion del controlador
  );
  app.get("/product", [], readProducts);

  app.delete("/product", [], deleteProduct);
};
