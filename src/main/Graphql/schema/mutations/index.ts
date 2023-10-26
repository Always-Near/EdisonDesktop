import { GraphQLObjectType } from 'graphql'
import { appField } from './app'
import { configField } from './config'

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    app: appField,
    config: configField
  }
})

export default RootMutation
