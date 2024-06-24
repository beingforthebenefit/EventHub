import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth'
import eventRoutes from './routes/event'
import { authenticate } from './middleware/authMiddleware'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Use the auth routes
app.use('/auth', authRoutes)

// Use the event routes
app.use('/event', eventRoutes)

// Protect routes that require authentication
app.use('/protected', authenticate, (req, res) => {
  res.send('This is a protected route.')
})

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
