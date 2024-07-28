import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { EventResolver } from "./resolvers/EventResolver"; // New resolver
import { RegistrationResolver } from "./resolvers/RegistrationResolver"; // New resolver
import { Context } from "./types/Context";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "your_secret_key"; // Ensure this is set in your environment

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, EventResolver, RegistrationResolver], // Add EventResolver
    authChecker: ({ context }) => {
      return !!context.userId; // Return true if userId exists in context
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }): Context => {
      const token = req.headers.authorization || "";
      let userId;
      if (token) {
        try {
          const payload = jwt.verify(token, SECRET) as any;
          userId = payload.userId;
        } catch (err) {
          console.error(err);
        }
      }
      return { req, res, userId };
    },
  });

  await server.start();

  const app = Express();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

main();
