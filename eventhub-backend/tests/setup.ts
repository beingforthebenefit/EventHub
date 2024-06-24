import { execSync } from 'child_process'
import prisma from '../src/prismaClient'

beforeAll(async () => {
  execSync('npx prisma migrate dev --name init --skip-seed', {
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  })

  await prisma.user.deleteMany() // Clean up the database
})

afterAll(async () => {
  await prisma.$disconnect()
})
