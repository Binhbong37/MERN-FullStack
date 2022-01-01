const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts-routes");
const MONGODB_URI = "mongodb://localhost:27017/mern-learn";
const PORT = process.env.port || 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/posts", postsRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app starting port ${PORT}`);
    });
    console.log("CONNECT DB SUCCESSFULLY");
  })
  .catch((err) => console.log(err));
