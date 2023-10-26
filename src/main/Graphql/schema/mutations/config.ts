import { GraphQLFieldConfig, GraphQLObjectType } from 'graphql'
import { updateConfig, UpdateConfigArgs } from '~/main/Servers/config'
import { GraphQLConfigKeyType, GraphQLConfigValueType } from '../types/config'
import { MutationResultSchema } from './mutation-result'

const updateConfigFields: GraphQLFieldConfig<any, any, UpdateConfigArgs> = {
  type: MutationResultSchema,
  args: {
    key: {
      type: GraphQLConfigKeyType
    },
    value: {
      type: GraphQLConfigValueType
    }
  },
  resolve: async (source: any, args: UpdateConfigArgs) => {
    return updateConfig(args)
  }
}

const ConfigMutationSchema = new GraphQLObjectType({
  name: 'ConfigMutation',
  fields: {
    updateConfig: updateConfigFields
  }
})

export const configField = {
  type: ConfigMutationSchema,
  resolve() {
    return {}
  }
}
