const { model, Schema } = require("mongoose");

//store model

const StoreSC = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  geographicalLocation: { type: String },
  nearestStore: [{ type: Schema.Types.ObjectId, ref: "store" }],
});

const Store = model("store", StoreSC);

module.exports = { Store, StoreSC };
