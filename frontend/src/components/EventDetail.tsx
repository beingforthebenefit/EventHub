import React from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {GET_EVENT} from '../queries/eventQueries'

const EventDetail: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const {loading, error, data} = useQuery(GET_EVENT, {
    variables: {id: id ? parseInt(id) : undefined},
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const {event} = data

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
    </div>
  )
}

export default EventDetail
