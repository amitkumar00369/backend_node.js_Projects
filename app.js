require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require("./db/db_connect");
const UserRoute = require('./routes/user.rotes');
const adminRoute = require('./routes/admin.routes');
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/", UserRoute);
// admin routes
app.use("", adminRoute);

app.listen(process.env.port, function () {
  console.log("🚀 ready to go",process.env.port);
});



