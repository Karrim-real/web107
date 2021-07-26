// const express = require("express");
// const rootDir = require("./util/path");
// const path = require("path");
// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
// const shopRoute = require("./routes/shop");
// const bodyParser = require("body-parser");

const express = require("express");
const rootDir = require("./util/path");
const path = require("path");
const mongoose = require("mongoose");
const assert = require("assert");
const shopRoute = require("./routes/shop");

const app = express();

mongoose
  .connect(
    "mongodb+srv://karrim4real:7NTwDqkKvbdEliXY@cluster0.8tzc3.mongodb.net/devlab?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Database connected successfully !!"))
  .catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));

// view engine setup
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//Login middleware
app.use(shopRoute);

//admin Middleware

app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
  });
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log(`app on port ${port}`);
});
