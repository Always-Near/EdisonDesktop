import { TableClass } from '~/constant/database'
import * as AppSchema from './appSchema'
import * as ConfigSchema from './configSchema'

export const AllTableSchemas = [AppSchema.Schema, ConfigSchema.Schema]
export type PropertiesType = {
  [TableClass.APP]: AppSchema.PropertiesType
  [TableClass.CONFIG]: ConfigSchema.PropertiesType
}
