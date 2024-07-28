import {Resolver, Mutation, Arg, Query} from 'type-graphql'
import {User} from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return prisma.user.findMany()
  }

  @Mutation(() => User)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return user
  }

  @Mutation(() => String)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<string> {
    const user = await prisma.user.findUnique({where: {email}})
    if (!user) {
      throw new Error('Invalid login credentials')
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid login credentials')
    }

    const token = jwt.sign(
      {userId: user.id, email: user.email},
      process.env.SECRET || '',
      {expiresIn: '1d'},
    )
    return token
  }
}
