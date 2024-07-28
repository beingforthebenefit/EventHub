import {RegistrationResolver} from '../resolvers/RegistrationResolver'
import {Request, Response} from 'express'
import {Context} from '../types/Context'
import prisma from '../prisma'

jest.mock('../prisma', () => ({
  registration: {
    create: jest.fn(),
  },
}))

const mockRegistration = {
  id: 1,
  eventId: 1,
  userId: 1,
  createdAt: new Date(),
  event: {id: 1, title: 'Event 1', description: 'Description 1', date: new Date(), location: 'Location 1'},
  user: {id: 1, email: 'test@example.com', password: 'hashedpassword'},
}

describe('RegistrationResolver', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('registerEvent', () => {
    it('should create a new registration', async () => {
      (prisma.registration.create as jest.Mock).mockResolvedValue(mockRegistration)
      const resolver = new RegistrationResolver()
      const ctx: Context = {req: {} as Request, res: {} as Response, userId: 1}
      const registration = await resolver.registerEvent(1, ctx)
      expect(registration).toEqual(mockRegistration)
      expect(prisma.registration.create).toHaveBeenCalledWith({
        data: {
          eventId: 1,
          userId: 1,
        },
        include: {
          event: true,
          user: true,
        },
      })
    })

    it('should throw an error if not authenticated', async () => {
      const resolver = new RegistrationResolver()
      const ctx: Context = {req: {} as Request, res: {} as Response}
      await expect(resolver.registerEvent(1, ctx)).rejects.toThrow('Not authenticated')
    })
  })
})
