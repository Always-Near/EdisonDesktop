export const TableClass = {
  APP: 'App',
  CONFIG: 'Config'
} as const

export const BaseValuesTypeEnum = {
  INTEGER: 'INTEGER',
  BIGINT: 'BIGINT',
  BLOB: 'BLOB',
  BOOLEAN: 'BOOLEAN',
  STRING: 'STRING',
  TEXT: 'TEXT',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  TIME: 'TIME',
  REAL: 'REAL'
  // CHAR: 'CHAR',
  // VARCHAR: 'VARCHAR',
  // INT: 'INT',
  // DOUBLE: 'DOUBLE',
  // DECIMAL: 'DECIMAL',
  // NUMERIC: 'NUMERIC',
  // NONE: 'NONE',
} as const

export type SchemaType = {
  tableName: Values<typeof TableClass>
  primaryKey?: string
  properties: Array<{
    name: string
    type: Values<typeof BaseValuesTypeEnum>
    autoIncrement?: boolean
    unique?: boolean
    default?: any
    length?: number
  }>
}
