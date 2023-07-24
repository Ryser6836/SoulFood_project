const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Jupil:jupilanime22@cluster0.cip7iaj.mongodb.net/SoulFood_MERN?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("connected");
    const fetchec_data = await mongoose.connection.db.collection("food_items");
    const data = await fetchec_data.find({}).toArray();
    global.food_items = data;
    // console.log(global.food_items);
  } catch (error) {
    console.log("---", error);
  }
};
module.exports = mongoDB;
