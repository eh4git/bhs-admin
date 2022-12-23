import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "../../apollo/schema";
import dbConnect from "../../db/connection";
import models from "../../db/models";

const apolloServer = new ApolloServer({ schema });

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    await dbConnect();
    return { req, res, context: { models } };
  },
});
