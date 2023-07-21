const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Jupil:jupilanime22@cluster0.cip7iaj.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
module.exports = mongoDB;
