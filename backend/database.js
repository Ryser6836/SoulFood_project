const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Jupil:jupilanime22@cluster0.cip7iaj.mongodb.net/SoulFood_MERN?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const catData = await foodCategory.find({}).toArray();
    // console.log(catData);
    global.food_items = data;
    global.foodCategory = catData;
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
module.exports = mongoDB;
