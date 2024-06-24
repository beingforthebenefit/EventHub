import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createEvent = async (req: Request, res: Response) => {
  const { title, description, date, time, location, image } = req.body
  const userId = req.user.id

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        image,
        organizerId: userId,
      },
    })
    res.status(201).json(event)
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(400).json({ error: 'Error creating event' })
  }
}