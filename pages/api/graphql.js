import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import Cors from "micro-cors";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import typeDefs from "../../utils/typeDefs";
import resolvers from "../../utils/resolvers";
import connectDb from "../../lib/connection";
import { send } from "micro";

connectDb();

const cors = Cors({
  allowMethods: ["POST", "OPTIONS"],
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({
      embed: true,
      headers: {
        "Content-Security-Policy":
          "default-src 'self' http://localhost:3000/api/graphql;",
      },
      credentials: "same-origin",
    }),
  ],
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({ path: "/api/graphql" });
  return cors((req, res) =>
    req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res)
  );
});
