// prisma/seed.ts
import { PrismaClient, User, Event, Registration } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Generate random users
  const users: Promise<User>[] = []
  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email()
    const password = await bcrypt.hash('password', 12)
    users.push(
      prisma.user.create({
        data: {
          email,
          password,
        },
      })
    )
  }
  const createdUsers: User[] = await Promise.all(users)

  // Generate random events
  const events: Promise<Event>[] = []
  for (let i = 0; i < 10; i++) {
    const title = faker.lorem.words(3)
    const description = faker.lorem.sentence()
    const date = faker.date.future()
    const location = faker.location.city()
    events.push(
      prisma.event.create({
        data: {
          title,
          description,
          date,
          location,
        },
      })
    )
  }
  const createdEvents: Event[] = await Promise.all(events)

  // Generate random registrations
  const registrations: Promise<Registration>[] = []
  for (let i = 0; i < 20; i++) {
    const eventId = faker.helpers.arrayElement(createdEvents).id
    const userId = faker.helpers.arrayElement(createdUsers).id
    registrations.push(
      prisma.registration.create({
        data: {
          eventId,
          userId,
        },
      })
    )
  }
  await Promise.all(registrations)

  console.log('Database has been seeded with random data. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
