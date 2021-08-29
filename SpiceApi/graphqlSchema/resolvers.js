const { Item } = require("../DbSchema/Item");
const { Store } = require("../DbSchema/Store");

const resolvers = {
  Query: {
    item: async (
      _,
      { date, name, store_location, pricelow, priceup, low, up, bound }
    ) => {
      const item = await Item.findOne({ date: date, name: name });
      return item;
    },

    show_store_info: (_, { storeid }) => {
      return Store.findOne({ _id: storeid }).populate({
        path: "nearestStore",
      });
    },
  },

  Item: {
    async prices(parent) {
      let priceArray = await Item.findOne({ _id: parent._id }).populate({
        path: "prices.store_info",
      });
      return priceArray.prices;
    },
  },

  Store: {
    async nearestStore(parent) {
      let h = await Store.findOne(
        { _id: parent._id },
        { nearestStore: 1, _id: 0 }
      ).populate({
        path: "nearestStore",
      });

      return h.nearestStore;
    },
  },

  Mutation: {
    insertNewItem: async (_, { item }, {}) => {
      const newItem = new Item(item);
      ritem = await newItem.save();
      return ritem;
    },

    insertNewStore: async (_, { store }, {}) => {
      const rstore = new Store(store);
      await rstore.save();
      return rstore;
    },

    addNearStores: async (_, { addTo, storeids }, {}) => {
      await Store.updateOne(
        { _id: addTo },
        {
          $push: { nearestStore: storeids },
        }
      );
      return Store.findById(addTo);
    },
  },
};

module.exports = { resolvers };
