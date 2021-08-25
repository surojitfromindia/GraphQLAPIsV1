const { Store } = require("./Store");
const { model, Schema } = require("mongoose");

const PriceSC = new Schema({
  date: Date,
  price: Number,
  store: Store,
});

const Price = model("price", PriceSC);
module.exports = { Price };
