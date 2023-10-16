
const {
    registerUser, userLogin
  } = require("../controllers/user.controller");
  
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


  }
// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/user.controller');
// const verifyJWT = require('../middleware/verifyJWT');

// Authentication
// router.post('/users/login', userController.userLogin);

// Registration
// router.post('/users', userController.registerUser);

// Get Current User
// router.get('/user', verifyJWT, userController.getCurrentUser);

// Update User
// router.put('/user', verifyJWT, userController.updateUser);

// module.exports = router;