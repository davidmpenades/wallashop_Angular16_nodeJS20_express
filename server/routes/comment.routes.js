const verifyJWT = require("../middleware/verifyJWT");
const verifyJWTOptional = require("../middleware/verifyJWTOptional");
const { addCommentsToProduct, getCommentsFromProduct, deleteComment } = require("../controllers/comment.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/:slug/comment", verifyJWT, addCommentsToProduct);

  app.get('/:slug/comments', verifyJWTOptional, getCommentsFromProduct);
  
  app.delete('/:slug/comments/:id', verifyJWT, deleteComment);
};


