const { StoreSC } = require("./Store");
const { model, Schema } = require("mongoose");

const PriceSC = new Schema({
  date: Date,
  price: Number,
  store: StoreSC,
});

const Price = model("price", PriceSC);
module.exports = { Price, PriceSC };
