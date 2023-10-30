const mdb = require("../models");

const asyncHandler = require("express-async-handler");

const Product = mdb.product;

const User = mdb.user;

const Comment = mdb.comment;

const addCommentsToProduct = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { slug } = req.params;
  const { body } = req.body;
  const product = await Product.findOne({ slug }).exec();

  const commenter = await User.findById(userId).exec();

  if (!commenter) {
    res.status(401).json({
      message: "User not found",
    });
  }
  if (!product) {
    res.status(401).json({
      message: "Product not found",
    });
  }
  const newComment = await Comment.create({
    body: body,
    author: commenter._id,
    product: product._id,
  });

  await product.addComment(newComment._id);

  return res.status(201).json({
    comment: await newComment.toCommentResponse(commenter._id),
  });
});

const getCommentsFromProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug }).exec();

  if (!product) {
    return res.status(401).json({
      message: "Product not found",
    });
  }

  return await res.status(200).json({
    comments: await Promise.all(
      product.comments.map(async (commentId) => {
        const commentObj = await Comment.findById(commentId).exec();
        console.log(commentObj);
        return await commentObj.toCommentResponse(
          req.loggedin ? req.userId : false
        );
      })
    ),
  });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { slug, id } = req.params;

  const userId = req.userId;

  const commenter = await User.findById(userId).exec();

  const product = await Product.findOne({slug}).exec()

  const comment = await Comment.findById(id)

  if(!commenter){
    return res.status(401).json({
        message: "Commenter Not Found"
    });
  }

  if(!product){
    return res.status(401).json({
        message: "Product Not Found"
    });
  }

  if(comment.author.toString() === commenter._id.toString()){
    await product.removeComment(comment._id)
    await comment.deleteOne({_id: comment._id})
    return res.status(200).json({
        message: "comment has been successfully deleted!!!"
    })
  }else {
    return res.status(403).json({
        error: "only the author of the comment can delete the comment"
    })
  }
});

module.exports = {
  addCommentsToProduct,
  getCommentsFromProduct,
  deleteComment,
};
