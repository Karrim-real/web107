const express = require("express");
const rootDir = require("./util/path");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const shopRoute = require("./routes/shop");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
require("./config/key");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Login middleware
app.use(shopRoute);

//admin Middleware

app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "Page Not Found",
  });
});

const port = process.env.PORT || 8000;

app.listen(port);
