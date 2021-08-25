const { ApolloServer, gql } = require("apollo-server");
const  mongoose  = require("mongoose");
const { typeDefs } = require("./graphqlSchema/typeDefs");
const { resolvers } = require("./graphqlSchema/resolvers");

const PORT = 5000;

const main = () => {
  mongoose
    .connect("mongodb://localhost:27017/SpiceDb")
    .then(() => {
      console.log("Database online");
      const server = new ApolloServer({ typeDefs, resolvers });

      server.listen({ port: PORT }).then(({ url }) => {
        console.log(url);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
