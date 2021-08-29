const { gql } = require("apollo-server");

const typeDefs = gql`
  enum Unit {
    KG
    GR
    L
    ML
    MG
    PC
  }

  input Quantity {
    unit: Unit!
    amount: Float!
  }

  input PriceInput {
    storeid: String!
    price: Int!
    date: String!
  }

  input NewItemInput {
    date: String!
    name: String!
    unit: Unit!
    openQuantity: Int!
    currency: String
    prices: [PriceInput]
    status: String = "open"
  }

  input StoreInput {
    name: String!
    location: String
    geographicalLocation: String!
  }

  input StoreInputWithId {
    storeId: String!
  }

  type Item {
    date: String!
    name: String!
    status: String
    unit: Unit!
    openQuantity: Int!
    tags: [String!]
    prices(currency: String = "Inr", quantity: Quantity = {}): [Prices!]
  }

  type Prices {
    store_info: Store!
    price: Int!
    date: String!
  }

  type Store {
    name: String
    location: String
    nearestStore: [Store]
    geographicalLocation: String
  }

  type Query {
    item(
      date: String!
      name: String!
      store_location: [String!] = []
      pricelow: Int
      priceup: Int
      low: Int = 30
      up: Int = 30
      bound: Int = 30
    ): Item
    show_store_info(storeid: String!): Store
  }

  type Mutation {
    insertNewItem(item: NewItemInput): Item!
    insertNewStore(store: StoreInput): Store!
    addNearStores(addTo: String!, storeids: [String!]): Store!
  }
`;

module.exports = { typeDefs };
