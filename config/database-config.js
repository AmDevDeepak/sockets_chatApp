const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatApp");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Some error occurred while connecting to MongoDB", error);
  }
};

module.exports = connect;
