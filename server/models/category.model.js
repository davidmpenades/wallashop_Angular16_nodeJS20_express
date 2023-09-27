module.exports = (mongoose, slugify, uniqueValidator) => {
  const schema = mongoose.Schema(
    {
      slug: {
        type: String,
        lowercase: true,
        unique: true,
      },
      title: String,
      img: String,
      products: [
        {
          type: mongoose.Schema.Types.ObjectId, //   preguntar a yolanda sobre slug
          ref: "product",
        },
      ],
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

  schema.methods.toCategoryResponse = async function () {
    return {
      slug: this.slug,
      title: this.title,
      img: this.img,
    };
  };

  schema.methods.addProduct = function (productId) {
    if (this.products.indexOf(productId) === -1) {
      this.products.push(productId);
    }
    return this.save();
  };

  schema.methods.removeProduct = function (productId) {
    if (this.products.indexOf(productId) !== -1) {
      this.products.remove(productId);
    }
    return this.save();
  };

  const Category = mongoose.model("category", schema);

  return Category;
};
