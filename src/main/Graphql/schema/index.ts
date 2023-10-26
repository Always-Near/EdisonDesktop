import { GraphQLSchema } from 'graphql'
import RootMutation from './mutations'
import RootQuery from './queries'
import Types from './types'

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  types: Types
})

export default schema
