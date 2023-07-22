require("dotenv").config();

const express = require("express");
const routes = require('./routes/routes')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoURL = process.env.DB_URL;


mongoose.connect(mongoURL);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api', routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
