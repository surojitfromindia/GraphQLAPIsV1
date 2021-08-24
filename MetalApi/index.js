const { ApolloServer } = require("apollo-server");
const { resolvers, typeDefs } = require("./graphql-schema/schema");
const mongoose = require("mongoose");

//port numbrr
const PORT = 4000;

const Main = () => {
  mongoose
    .connect("mongodb://localhost:27017/MetalDb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then((connection) => {
      console.log("database online");
      const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        introspection: true,
      });
      server.listen({ port: PORT }).then((info) => {
        console.log("Server is online");
      });
    });
};

Main();
