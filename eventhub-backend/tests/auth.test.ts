import request from 'supertest'
import { PrismaClient } from '@prisma/client'
import app from '../src/index'

const prisma = new PrismaClient()

beforeAll(async () => {
  await prisma.user.deleteMany() // Clean up the database
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Auth Endpoints', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        name: 'Test User'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('token')
  })

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })
})
