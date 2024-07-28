import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Event } from "../models/Event";
import prisma from "../prisma";

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  async events() {
    return prisma.event.findMany();
  }

  @Mutation(() => Event)
  async createEvent(
    @Arg("title") title: string,
    @Arg("description") description: string,
    @Arg("date") date: Date,
    @Arg("location") location: string
  ) {
    return prisma.event.create({
      data: { title, description, date, location }
    });
  }
}
