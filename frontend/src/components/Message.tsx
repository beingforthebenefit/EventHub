import React from 'react'
import {useQuery, gql} from '@apollo/client'

export const GET_MESSAGE = gql`
  query GetMessage {
    message
  }
`

const Message: React.FC = () => {
  const {loading, error, data} = useQuery(GET_MESSAGE)

  if (loading) return <span>Loading...</span>
  if (error) return <span>Error: {error.message}</span>

  return <span>{data.message}</span>
}

export default Message
