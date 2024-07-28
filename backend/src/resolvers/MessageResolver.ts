import {Resolver, Query} from 'type-graphql'

@Resolver()
export class MessageResolver {
  @Query(() => String)
  message() {
    return 'Hello from the backend!'
  }
}
