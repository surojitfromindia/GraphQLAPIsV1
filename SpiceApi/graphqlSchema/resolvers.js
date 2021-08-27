let v = [];
const { Item } = require("../DbSchema/Item");
const { Store } = require("../DbSchema/Store");

const resolvers = {
  Query: {
    item: (
      _,
      { date, name, store_location, pricelow, priceup, low, up, bound }
    ) => {
      return {
        date: "2021-8-24",
        name: "Cardimon",
        status: "open",
        openQuantity: 1,
        unit : "KG",
        prices: [
          {
            store: {
              name: "Rajur dokan",
              location: "vivekpalli, Belting bajar, 712203",
              geographicalLocation: "Serampore, Hooghly, West Bengal",
              nearestStore: [
                {
                  name: "Shaymoner dokan",
                  location: "vivekpalli, Belting bajar, 712203",
                  geographicalLocation: "Serampore, Hooghly, West Bengal",
                },
              ],
            },

            price: 12,
            date: "2021-8-23",
          },
          {
            store: {
              name: "Shaymoner dokan",
              location: "vivekpalli, Belting bajar, 712203",
              geographicalLocation: "Serampore, Hooghly, West Bengal",
              nearestStore: [
                {
                  name: "Rajur dokan",
                  location: "vivekpalli, Belting bajar, 712203",
                  geographicalLocation: "Serampore, Hooghly, West Bengal",
                },
              ],
            },
            price: 13,
            date: "2021-8-23",
          },
        ],
      };
    },

    show_store_info: (_, { storeid }) => {
      return Store.findOne({ _id: storeid }).populate({
        path: "nearestStore",
      });
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
    insertNewItem: async (_, { item }, { dbc }) => {
      const ritem = await Item.Insert(item);
      return ritem;
    },
    insertNewStore: async (_, { store }, { dbc }) => {
      const rstore = new Store(store);
      await rstore.save();
      return rstore;
    },

    addNearStores: async (_, { addTo, storeids }, { dbc }) => {
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
