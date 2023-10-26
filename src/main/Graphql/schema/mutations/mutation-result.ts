import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'

export const MutationResultSchema = new GraphQLObjectType({
  name: 'MutationResult',
  fields: {
    successful: {
      type: GraphQLBoolean
    },
    message: {
      type: GraphQLString
    }
  }
})
