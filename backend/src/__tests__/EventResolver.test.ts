import {EventResolver} from '../resolvers/EventResolver'
import prisma from '../prisma'

jest.mock('../prisma', () => {
  return {
    event: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  }
})

const mockEvents = [
  {id: 1, title: 'Event 1', description: 'Description 1', date: new Date(), location: 'Location 1'},
  {id: 2, title: 'Event 2', description: 'Description 2', date: new Date(), location: 'Location 2'},
]

const mockEvent = {id: 1, title: 'Event 1', description: 'Description 1', date: new Date(), location: 'Location 1'}

beforeEach(() => {
  (prisma.event.findMany as jest.Mock).mockResolvedValue(mockEvents);
  (prisma.event.findUnique as jest.Mock).mockResolvedValue(mockEvent)
})

test('returns events', async () => {
  const resolver = new EventResolver()
  const events = await resolver.events()
  expect(events).toEqual(mockEvents)
})

test('returns an event by id', async () => {
  const resolver = new EventResolver()
  const event = await resolver.event(1)
  expect(event).toEqual(mockEvent)
})
