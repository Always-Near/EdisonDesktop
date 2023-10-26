import { ConfigValueType } from '~/constant/config'
import { SchemaType, TableClass } from '~/constant/database'

export const Schema: SchemaType = {
  tableName: TableClass.CONFIG,
  primaryKey: 'id',
  properties: [
    {
      name: 'id',
      type: 'INTEGER',
      autoIncrement: true
    },
    {
      name: 'key',
      type: 'TEXT'
    },
    {
      name: 'value',
      type: 'TEXT'
    },
    {
      name: 'valueType',
      type: 'TEXT'
    },
    {
      name: 'createAt',
      type: 'DATETIME'
    },
    {
      name: 'updateAt',
      type: 'DATETIME'
    },
    {
      name: 'isDeleted',
      type: 'BOOLEAN'
    }
  ]
}

export type PropertiesType = {
  id: number
  key: string
  value: string
  valueType: Values<typeof ConfigValueType>
  updateAt: number
  createAt: number
  isDeleted: 0 | 1
}
