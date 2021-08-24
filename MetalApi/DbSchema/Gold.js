const { Schema, model } = require("mongoose");

const GoldPriceSchema = new Schema({
  location: String,
  tfk: Number,
  ttk: Number,
  HallMark: Number,
  status: String,
});

const GoldSchema = new Schema({
  date: Date,
  prices: [GoldPriceSchema],
});

const Gold = model("gold", GoldSchema);

module.exports = { Gold };
