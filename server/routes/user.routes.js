
const {
    registerUser, userLogin, getCurrentUser, updateUser
  } = require("../controllers/user.controller");
const verifyJWT = require("../middleware/verifyJWT");
  
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
      "/users", // ruta para acceder
      [], // middlewares
      registerUser // llamamos a la funcion del controlador
    );

    app.post(
      "/users/login",
      [],
      userLogin
    )
    
    app.get(
      "/user/profile",
      [
        verifyJWT
      ],
      getCurrentUser
    )

    app.get(
      "/user/profile/:id",
      [],
      getCurrentUser
    )
    
    app.put(
      "/user/update",
      [
        verifyJWT
      ],
      updateUser
    )

  }