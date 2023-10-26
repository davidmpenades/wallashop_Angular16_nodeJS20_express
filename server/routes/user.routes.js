
const {
    registerUser, userLogin, getCurrentUser, updateUser, followOrUnfollowUser
  } = require("../controllers/user.controller");
const verifyJWT = require("../middleware/verifyJWT");
const verifyJWTOptional = require("../middleware/verifyJWTOptional");
  
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
      [
        verifyJWTOptional
      ],
      getCurrentUser
    )

    app.put(
      "/user/profile/:id",
      [
        verifyJWT
      ],
      followOrUnfollowUser
    )
    
    app.put(
      "/user/update",
      [
        verifyJWT
      ],
      updateUser
    )

  }