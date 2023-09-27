const express = require("express");
const cors = require("cors");
const app = express();

// Conexion MongoDB
const mdb = require("./models/");

mdb.mongoose
  .connect(process.env.MONGO_URI || mdb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = {
  origin: process.env.CORSURL || "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);

// Iniciar el servidor
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
