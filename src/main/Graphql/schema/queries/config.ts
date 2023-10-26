import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
  ThunkObjMap
} from 'graphql'
import { ConfigSchema, ConfigValueType } from '~/constant/config'
import { Config } from '~/type'
import { getConfig } from '~/main/Servers/config'
import { GraphQLDate } from '../types/date'

function generateConfigFieldsType(type: Config['valueType']) {
  switch (type) {
    case ConfigValueType.Boolean:
      return GraphQLBoolean
    case ConfigValueType.Number:
      return GraphQLFloat
    case ConfigValueType.Date:
      return GraphQLDate
    default:
      break
  }
  return GraphQLString
}

function generateConfigFields() {
  const fields: ThunkObjMap<GraphQLFieldConfig<any, any>> = {}
  Object.values(ConfigSchema).forEach(item => {
    fields[item.key] = {
      type: generateConfigFieldsType(item.type)
    }
  })
  return fields
}

const ConfigQuerySchema = new GraphQLObjectType({
  name: 'ConfigQuery',
  fields: generateConfigFields()
})

export const configField = {
  type: ConfigQuerySchema,
  resolve: getConfig
}
