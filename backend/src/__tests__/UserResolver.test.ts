import {UserResolver} from '../resolvers/UserResolver'
import prisma from '../prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

jest.mock('../prisma', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
}))

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}))

const mockUsers = [
  {id: 1, email: 'test1@example.com', password: 'hashedpassword1'},
  {id: 2, email: 'test2@example.com', password: 'hashedpassword2'},
]

describe('UserResolver', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    it('should create a new user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUsers[0])
      const resolver = new UserResolver()
      const user = await resolver.register('test1@example.com', 'password')
      expect(user).toEqual(mockUsers[0])
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 12)
    })
  })

  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUsers[0]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token')
      const resolver = new UserResolver()
      const token = await resolver.login('test1@example.com', 'password')
      expect(token).toBe('token')
    })

    it('should throw an error for invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      const resolver = new UserResolver()
      await expect(resolver.login('test1@example.com', 'password')).rejects.toThrow('Invalid login credentials')
    })
  })

  describe('users', () => {
    it('should return a list of users', async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers)
      const resolver = new UserResolver()
      const users = await resolver.users()
      expect(users).toEqual(mockUsers)
    })
  })
})
