import {Field, ObjectType} from 'type-graphql'

@ObjectType()
export class Event {
  @Field()
  id!: number

  @Field()
  title!: string

  @Field()
  description!: string

  @Field()
  date!: Date

  @Field()
  location!: string
}
