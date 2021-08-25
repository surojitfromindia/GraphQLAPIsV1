const { model, Schema } = require("mongoose");

//store model

const StoreSC = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  geographicalLocation: { type: String },
  nearestStore: [StoreSC],
});

const Store = model("store", StoreSC);

module.exports = { Store };
