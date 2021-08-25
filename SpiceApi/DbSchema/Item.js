const { Price } = require("./Price");
const { model, Schema } = require("mongoose");

const ItemSC = new Schema({
  name: String,
  status: String,
  unit: String,
  openQuantity: Number,
  prices: [Price],
});

const Item = model("item", ItemSC);

module.exports = { Item };
