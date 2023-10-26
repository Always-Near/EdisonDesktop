import { GraphQLObjectType } from 'graphql'
import { appField } from './app'
import { configField } from './config'
import { fsField } from './fs'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    app: appField,
    config: configField,
    fs: fsField
  }
})

export default RootQuery
