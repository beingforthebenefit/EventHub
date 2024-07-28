import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_EVENTS} from '../queries/eventQueries'

const EventList = () => {
  const {loading, error, data} = useQuery(GET_EVENTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {data.events.map((event: any) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList
