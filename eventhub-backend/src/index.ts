import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

// GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Root resolver
const root = {
  hello: () => {
    return 'Hello world!'
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

// Ensure that Prisma is connected
prisma.$connect()
  .then(() => {
    console.log('Connected to the database')
    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000/graphql')
    })
  })
  .catch((e: any) => {
    console.error('Failed to connect to the database', e)
    process.exit(1)
  })
