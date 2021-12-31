const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");

const MONGODB_URI = "mongodb://localhost:27017/mern-learn";

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("DB CONNECTED ");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

app.use(express.json());

app.use("/api/auth", userRoutes);

app.listen(5000);
