const { connection } = require("./Config/db");
const express = require("express");
const cors = require("cors");
const { ClassifiedsModel } = require("./Model/Classifieds.model");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    let data = await ClassifiedsModel.find();
    res.send(data);
  } catch (err) {
    res.send("something went wrong");
  }
});

app.post("/", async (req, res) => {
  let { name, description, category, image, location, postedAt, price } =
    req.body;
  try {
    let data = new ClassifiedsModel({
      name,
      description,
      category,
      image,
      location,
      postedAt,
      price,
    });
    await data.save();
    res.send("data added successfully");
  } catch (err) {
    res.send("something went wrong");
  }
});

app.get("/filterBy", async (req, res) => {
  let category = req.query.category;
  try {
    let data = await ClassifiedsModel.find({ category });
    res.send(data);
  } catch (err) {
    res.send("something went wrong");
  }
});

app.get("/sortBy", async (req, res) => {
  let order = req.query.order;

  if (order == "asc") {
    order = -1;
  } else {
    order = 1;
  }

  try {
    let data = await ClassifiedsModel.find().sort({ postedAt: order });
    res.send(data);
  } catch (err) {
    res.send("something went wrong");
  }
});

app.get("/search/:search", async (req, res) => {
  let search = req.params.search;
  try {
    let data = await ClassifiedsModel.find({
      name: { $regex: search, $options: "i" },
    });
    res.send(data);
  } catch (err) {
    res.send("something went wrong");
  }
});

app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await ClassifiedsModel.findOneAndDelete({ _id: id });
    res.send("data deleted");
  } catch (err) {
    res.send("something went wrong");
  }
});

app.get("/getByPage/:limit/:skip", async (req, res) => {
  let limit = +req.params.limit;
  let skip = +req.params.skip;

  try {
    const data = await ClassifiedsModel.find({}).skip(skip).limit(limit).exec();

    res.send(data);
  } catch (err) {
    res.send("something went wrong");
  }
});

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`Connect to db and running on ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
