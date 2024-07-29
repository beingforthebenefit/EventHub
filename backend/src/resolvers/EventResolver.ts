import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  Authorized,
  Ctx
} from 'type-graphql'
import {Event} from '../models/Event'
import prisma from '../prisma'
import {Context} from '../types/Context'
import { DateTimeResolver } from 'graphql-scalars'

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return prisma.event.findMany()
  }

  @Query(() => Event, {nullable: true})
  async event(@Arg('id', () => Int) id: number): Promise<Event | null> {
    return prisma.event.findUnique({
      where: {id},
    })
  }

  @Authorized()
  @Query(() => [Event])
  async myEvents(@Ctx() ctx: Context): Promise<Event[]> {
    return prisma.event.findMany({
      where: {
        registrations: {
          some: {
            userId: ctx.userId,
          },
        },
      },
    })
  }

  @Authorized()
  @Mutation(() => Event)
  async createEvent(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('date', () => DateTimeResolver) date: Date,
    @Arg('location') location: string,
  ): Promise<Event> {
    return await prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
      },
    })
  }
}
