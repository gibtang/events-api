const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar DateTime

  type Event {
    uid: ID
    name: String
    description: String
    location: String
    rsvp_count: Int
    url: String
    group_id: String
    group_name: String
    group_url: String
    formatted_time: String
    start_time: DateTime
    end_time: DateTime
    platfrom: String
    platfrom_identifier: String
    latitude: Float
    longitude: Float
    active: Boolean
  }

  type PageInfo {
    currentPage: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type EventConnection {
    nodes: [Event]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type Query {
    hello: String
    event(uid: ID!): Event
    events(pageNumber: Int!, perPage: Int, from: DateTime, to: DateTime): EventConnection
  }
`

module.exports.typeDefs = typeDefs