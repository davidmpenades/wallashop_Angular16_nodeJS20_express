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
  
  commentSchema.methods.toCommentResponse = async function (user, data) {
      return{
          id: this._id,
          body: this.body,
          author: this.author,
          isAuthor: user == this.author ? true : false,  
          ownerData: data
      }

  }

  const Comment = mongoose.model("comment", commentSchema)
  return Comment
}
