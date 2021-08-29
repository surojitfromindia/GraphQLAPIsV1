const { StoreSC, Store } = require("./Store");
const { model, Schema, SchemaType } = require("mongoose");

const PriceSC = new Schema({
  date: { type: Date },
  price: { type: Number },
  store_info: { type: Schema.Types.ObjectId, ref: "store" },
});

const Price = model("price", PriceSC);
module.exports = { Price, PriceSC };
