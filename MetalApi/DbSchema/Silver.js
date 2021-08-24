const { Schema, model } = require("mongoose");

const SilverPriceSchema = new Schema({
  location: String,
  slab: Number,
  tinker: Number,
  status: String,
});

const SilverSchema = new Schema({
  date: Date,
  prices: [SilverPriceSchema],
});

const Silver = model("silver", SilverSchema);

module.exports = { Silver };
