import {Resolver, Mutation, Arg, Ctx, Int, Authorized} from 'type-graphql'
import {Registration} from '../models/Registration'
import prisma from '../prisma'
import {Context} from '../types/Context'

@Resolver()
export class RegistrationResolver {
  @Authorized()
  @Mutation(() => Registration)
  async registerEvent(
    @Arg('eventId', () => Int) eventId: number,
    @Ctx() ctx: Context,
  ): Promise<Registration> {
    const userId = ctx.userId
    if (!userId) {
      throw new Error('Not authenticated')
    }
    const registration = await prisma.registration.create({
      data: {
        eventId,
        userId,
      },
      include: {
        event: true,
        user: true,
      },
    })
    return registration
  }
}
