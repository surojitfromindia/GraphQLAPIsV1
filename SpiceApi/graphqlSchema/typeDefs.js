const { gql } = require("apollo-server");

const typeDefs = gql`
  # every item has its name
  # quantity either in gram, kg, litter or pices.
  # have individual store infos
  type Item {
    date: String!
    name: String!
    status: String
    unit: String!
    openQuantity: Int!
    prices: [Prices!]
  }

  # each item in store has
  # price, date the data is collected,
  # a Store field
  type Prices {
    store: Store!
    price: Int!
    date: String!
  }

  # store has name
  type Store {
    name: String!
    location: String
    nearestStore: [Store]
    # geographical location (eg. kolkata, serampore, etc.)
    geographicalLocation: String!
  }

  type Query {
    # low is lower day bound
    # up is upper day bound (must be less than the difference between given date and current date)
    # bound for both up and lower bound
    # returns item
    item(
      date: String!
      name: [String!] = []
      store_location: [String!] = []
      pricelow: Int
      priceup: Int
      low: Int = 30
      up: Int = 30
      bound: Int = 30
    ): Item!
  }

  input StoreInput {
    name: String!
    location: String
    # geographical location (eg. kolkata, serampore, etc.)
    geographicalLocation: String!
  }
  input PriceInput {
    store: StoreInput!
    price: Int!
    date: String!
  }
  input NewItemInput {
    date: String!
    name: String!
    unit: String!
    openQuantity: Int!
    currency: String
    prices: [PriceInput]
    status: String = "open"
  }
  
  type Mutation {
    insertNewItem(item: NewItemInput): Item
  }
`;

module.exports = { typeDefs };
