import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import Express from "express"
import { buildSchema } from "type-graphql"
import { MessageResolver } from "./resolvers/MessageResolver"

async function main() {
  const schema = await buildSchema({
    resolvers: [MessageResolver],
  })

  const server = new ApolloServer({ schema })
  await server.start()

  const app = Express()
  server.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql")
  })
}

main()
