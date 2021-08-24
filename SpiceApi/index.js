const { ApolloServer, gql } = require("apollo-server");

const PORT = 5000;

const typeDefs = gql`
  type Status {
    state: String
  }
  type Query {
    state: Status!
  }
`;
const resolver = {
  state: () => {
    return {
      state: "Ok",
    };
  },
};

const server = new ApolloServer({typeDefs,resolver});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(url);
});
