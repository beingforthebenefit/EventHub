import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const generateToken = (user: { id: number, email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })
}

export const signup = async (req: Request, res: Response) => {
  console.log('Signup route hit')
  const { email, password, name } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })
    const token = generateToken(user)
    res.status(201).json({ token })
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.error('Invalid credentials: user not found')
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    console.error('Invalid credentials: password mismatch')
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = generateToken(user)
  res.status(200).json({ token })
}
