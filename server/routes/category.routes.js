// requerimientos de metodos del controlador
const {
  createCategory,
  deleteCategory,
  readCategories,
} = require("../controllers/category.controller");

// exportamos las rutas
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //creamos los metodos
  //creamos una categoria
  app.post(
    "/category", // ruta para acceder
    [], // middlewares
    createCategory // llamamos a la funcion del controlador
  );

  //eliminar una categoria
  app.delete("/category", [], deleteCategory);

  // leer todas las categoria
  app.get("/category", [], readCategories);
};
