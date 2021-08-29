const { PriceSC } = require("./Price");
const { model, Schema } = require("mongoose");

const ItemSC = new Schema({
  name: String,
  status: String,
  date: Date,
  unit: String,
  openQuantity: Number,
  tags: [String],
  prices: [PriceSC],
});

const Item = model("item", ItemSC);

module.exports = { Item };
