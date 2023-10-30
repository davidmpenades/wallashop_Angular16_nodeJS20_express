module.exports = (mongoose) => {
  const commentSchema =  mongoose.Schema(
    {
      body: {
        type: String,
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
    { 
      timestamps: true 
  });
  
  commentSchema.methods.toCommentResponse = async function (user) {
    console.log(user);
      return{
          id: this._id,
          body: this.body,
          author: this.author,
          isAuthor: user == this.author ? true : false,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
      }

  }

  const Comment = mongoose.model("comment", commentSchema)
  return Comment
}
