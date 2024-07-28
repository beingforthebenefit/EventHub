import {Field, Int, ObjectType} from 'type-graphql'
import {User} from './User'
import {Event} from './Event'

@ObjectType()
export class Registration {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  eventId!: number

  @Field(() => Int)
  userId!: number

  @Field()
  createdAt!: Date

  @Field(() => Event)
  event!: Event

  @Field(() => User)
  user!: User
}
