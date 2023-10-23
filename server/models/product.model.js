module.exports = (mongoose, slugify, uniqueValidator) => {
  const schema = mongoose.Schema(
    {
      slug: {
        type: String,
        lowercase: true,
        unique: true,
      },
      title: String,
      description: String,
      price: Number,
      imgs: Array,
      category: String,
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        }
      ],
      countLikes: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  );
  schema.plugin(uniqueValidator);
  schema.pre("save", function (next) {
    if (!this.slug) {
      this.slug = slugify(
        this.title + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36),
        { lower: true, replacement: "-" }
      );
    }
    next();
  });

  schema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    return object;
  });

  schema.methods.toProductResponse = async function (userId) {
    return {
      slug: this.slug,
      title: this.title,
      description: this.description,
      price: this.price,
      imgs: this.imgs,
      category: this.category,
      owner: this.owner,
      liked: this.likes.includes(userId),
      countLikes: this.countLikes
    };
  };

  schema.methods.like = function (userId) {
    if (this.likes.indexOf(userId) === -1) {
      this.likes.push(userId);
      this.countLikes++
    }
    return this.save();
  };

  schema.methods.unlike = function (userId) {
    if (this.likes.indexOf(userId) !== -1) {
      this.likes.remove(userId);
      this.countLikes--
    }
    return this.save();
  };

  const Product = mongoose.model("product", schema);

  return Product;
};
