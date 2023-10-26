import { graphql, GraphQLArgs } from 'graphql'
import Config from '~/config'
import { getSdk } from '~/utils/Graphql'
import schema from './schema'

class GraphqlServer {
  private graphqlSdk = getSdk(async (doc: string, vars?: any) => {
    const result = await this.handleGraphql({
      source: doc,
      variableValues: vars
    })
    return result.data as any
  })

  handleGraphql = (params: Pick<GraphQLArgs, 'source' | 'variableValues'>) => {
    return graphql({
      schema,
      ...params
    })
  }

  handleRequester = () => {
    return this.graphqlSdk
  }

  startApolloServer = async () => {
    const serverEnable = Config.get('APOLLO_GRAPHQL_ENABLE')
    if (!serverEnable) {
      return
    }
    const port = Config.get('APOLLO_GRAPHQL_PORT')
    const { ApolloServer } = require('@apollo/server')
    const { startStandaloneServer } = require('@apollo/server/standalone')
    const server = new ApolloServer({
      schema: schema
    })
    const { url } = await startStandaloneServer(server, {
      listen: { port: port }
    })
    console.log(`🚀 Apollo Server ready at: ${url}`)
  }
}

export default new GraphqlServer()
