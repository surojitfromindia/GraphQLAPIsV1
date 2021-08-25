let v = [];

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
        unit: "kg",
        openQuantity: 1,
        currency: "Inr",
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
  },

  Mutation: {
    insertNewItem: (_, { item }, { dbc }) => {
      v.push(item);
      console.log(item);
      return v[v.length - 1];
    },
  },
};

module.exports = { resolvers };
