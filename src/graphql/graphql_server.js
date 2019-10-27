const { ApolloServer } = require('apollo-server-express')

const schemaPath = require('path').join(__dirname, '/schema.graphql')
const typeDefs = require('graphql-import').importSchema(schemaPath)

const { eventResolver, eventQueryResolver, eventsQueryResolver, createEventMutationResolver } = require('./resolvers/event')
const { groupResolver, groupQueryResolver, groupsQueryResolver } = require('./resolvers/group')
const resolvers = {
  Query: {
    event: eventQueryResolver,
    events: eventsQueryResolver,
    group: groupQueryResolver,
    groups: groupsQueryResolver,
  },
  Mutation: {
    createEvent: createEventMutationResolver
  },
  Event: eventResolver,
  Group: groupResolver
}

const jwt = require('jsonwebtoken')
function getUser(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const context = ({ req }) => {
  const contextData = {}

  try {
    const token = req.headers.authorization || ''
    if (token.length > 0) {
      contextData.user = getUser(token)
    }
  } catch (err) {
    console.error('Error:', err.message)
  }

  return contextData
}

module.exports = new ApolloServer({ typeDefs, resolvers, context, introspection: true, playground: true })
