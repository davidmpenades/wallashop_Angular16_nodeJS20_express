const mdbConfig = require("../config/mdb.config.js");
const mongoose = require("mongoose");
const slugify = require("slugify");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken")

mongoose.Promise = global.Promise;

const mdb = {};
mdb.mongoose = mongoose;

// si no se encuntra la url de .env utilizara la de mdbConfig
mdb.url = process.env.MONGO_URI || mdbConfig.url;

mdb.category = require("./category.model.js")(
  mongoose,
  slugify,
  uniqueValidator
);

mdb.user = require("./user.model.js")(mongoose, uniqueValidator, jwt);

module.exports = mdb;
