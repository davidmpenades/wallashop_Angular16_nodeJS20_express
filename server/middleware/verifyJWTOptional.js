const jwt = require('jsonwebtoken');

const verifyJWTOptional = (req, res, next) => {
    //cojemos el valor de headers que me llega en authorization y lo seteamos a la constante
    const authHeader = req.headers.authorization || req.headers.Authorization
    //comprobamos que no hay ningun valor y seteamos a false loggedin
    if (!authHeader || !authHeader?.startsWith('Token ') || !authHeader.split(' ')[1].length) {
        req.loggedin = false;
        return next();
    }
    // y si tiene valor, seteamos el token
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            //seteamos los valores del usuario
            req.loggedin = true;//ponemos loggedin a true
            req.userId = decoded.user.id;
            req.userEmail = decoded.user.email;
            req.userHashedPwd = decoded.user.password;
            next();
        }
    )
};

module.exports = verifyJWTOptional;