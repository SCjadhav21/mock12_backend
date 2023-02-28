const mongoose = require("mongoose");

const ClassifiedsSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  description: String,
  location: String,
  postedAt: String,
  price: Number,
});

const ClassifiedsModel = mongoose.model("olxdata", ClassifiedsSchema);

module.exports = { ClassifiedsModel };
