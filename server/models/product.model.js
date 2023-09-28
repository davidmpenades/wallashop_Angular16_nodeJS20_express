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

  schema.methods.toProductResponse = async function () {
    return {
      slug: this.slug,
      title: this.title,
      description: this.description,
      price: this.price,
      imgs: this.imgs,
      category: this.category,
    };
  };

  const Product = mongoose.model("product", schema);

  return Product;
};
