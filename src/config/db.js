const mongoose = require("mongoose");
const url=process.env.MONGO_URL
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/testecomm");
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    console.log(url)
    process.exit(1);
  }
};

module.exports = connectDB;
