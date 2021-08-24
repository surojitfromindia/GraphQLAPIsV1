const { gql } = require("apollo-server");
const { Gold } = require("../DbSchema/Gold");
const { Silver } = require("../DbSchema/Silver");

const typeDefs = gql`
  type Gold {
    date: String!
    prices: [GoldPrice!]!
  }

  type Silver {
    date: String!
    prices: [SilverPrice!]!
  }

  type SilverPrice {
    location: String
    slab: Int!
    tinker: Int!
    status: String!
  }

  type GoldPrice {
    location: String!
    tfk: Int!
    ttk: Int!
    HallMark: Int!
    status: String!
  }

  type Query {
    gold(a_date: String, locations: [String!]=[]): Gold
    golds(
      s_date: String
      e_date: String
      count: Int = 30
      locations: [String!] = []
    ): [Gold]
    silver(a_date: String, locations: [String!]=[]): Silver
    silvers(
      s_date: String
      e_date: String
      count: Int = 30
      locations: [String!] = []
    ): [Silver]
  }
`;

const resolvers = {
  Query: {
    gold: async (_, { a_date, locations }) => {
      // if location array is empty return all
      //else requested
      let b;
      if (locations.length == 0) b = await Gold.findOne({ date: a_date });
      else
        b = await Gold.aggregate([
          { $match: { date: new Date(a_date) } },
          {
            $project: {
              _id: 0,
              date: 1,
              prices: {
                $filter: {
                  input: "$prices",
                  as: "price",
                  cond: { $in: ["$$price.location", locations] },
                },
              },
            },
          },
        ]);
      if (Array.isArray(b)) b = b[0];
      return b;
    },
    golds: async (_, { s_date, e_date, count, locations }) => {
      let b;
      if (locations.length == 0)
        b = await Gold.find({
          date: { $lte: new Date(s_date), $gte: new Date(e_date) },
        });
      else
        b = await Gold.aggregate([
          {
            $match: {
              date: { $lte: new Date(s_date), $gte: new Date(e_date) },
            },
          },
          {
            $project: {
              _id: 0,
              date: 1,

              prices: {
                $filter: {
                  input: "$prices",
                  as: "price",
                  cond: { $in: ["$$price.location", locations] },
                },
              },
            },
          },
          {
            $limit: count,
          },
        ]);

      return b;
    },
    silver: async (_, { a_date, locations }) => {
      // if location array is empty return all
      //else requested
      let b;
      if (locations.length == 0) b = await Silver.findOne({ date: a_date });
      else
        b = await Silver.aggregate([
          { $match: { date: new Date(a_date) } },
          {
            $project: {
              _id: 0,
              date: 1,
              prices: {
                $filter: {
                  input: "$prices",
                  as: "price",
                  cond: { $in: ["$$price.location", locations] },
                },
              },
            },
          },
        ]);
      if (Array.isArray(b)) b = b[0];
      return b;
    },
    silvers: async (_, { s_date, e_date, count, locations }) => {
      let b;
      if (locations.length == 0)
        b = await Silver.find({
          date: { $lte: new Date(s_date), $gte: new Date(e_date) },
        });
      else
        b = await Silver.aggregate([
          {
            $match: {
              date: { $lte: new Date(s_date), $gte: new Date(e_date) },
            },
          },
          {
            $project: {
              _id: 0,
              date: 1,

              prices: {
                $filter: {
                  input: "$prices",
                  as: "price",
                  cond: { $in: ["$$price.location", locations] },
                },
              },
            },
          },
          {
            $limit: count,
          },
        ]);

      return b;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
