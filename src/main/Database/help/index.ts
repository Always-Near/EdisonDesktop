import Database from 'better-sqlite3'
import { SchemaType, TableClass } from '~/constant/database'
import Log from '~/utils/Log'

type DatabaseColumn = {
  cid: number
  name: string
  type: string
  notnull: 0 | 1
  dflt_value: any
  pk: number
}

class DatabaseHelp {
  private generateCreateTableSql = (tableSchema: SchemaType) => {
    return [
      `CREATE TABLE IF NOT EXISTS ${tableSchema.tableName} (
${tableSchema.properties
  .map(column => {
    const type = column.length ? `${column.type} (${column.length})` : column.type
    const isPrimaryKey = column.name === tableSchema.primaryKey
    const primaryKeySql = isPrimaryKey ? ' PRIMARY KEY' : ''
    const autoIncrementSql = column.autoIncrement ? ' AUTOINCREMENT' : ''
    const notNullSql = isPrimaryKey ? ' NOT NULL' : ''
    const uniqueSql = !isPrimaryKey && column.unique ? ' UNIQUE' : ''
    const defaultValueSql =
      !isPrimaryKey && column.default != undefined ? ` DEFAULT ${column.default}` : ''

    return `  ${column.name} ${type}${primaryKeySql}${autoIncrementSql}${notNullSql}${uniqueSql}${defaultValueSql},\n`
  })
  .join('')}
  UNIQUE (
      ${tableSchema.primaryKey || ''}
  )
);`
    ]
  }

  private generateUpdateTableSql = (tableSchema: SchemaType, tableColumns: DatabaseColumn[]) => {
    const sameColumns = tableSchema.properties.filter(item =>
      tableColumns.some(c => c.name === item.name)
    )
    const sameColumnsSql = sameColumns.map(c => c.name).join(', ')
    return [
      `CREATE TABLE sqlitestudio_temp_table AS SELECT * FROM ${tableSchema.tableName};`,
      `DROP TABLE ${tableSchema.tableName};`,
      ...this.generateCreateTableSql(tableSchema),
      `INSERT INTO ${tableSchema.tableName} (${sameColumnsSql}) SELECT ${sameColumnsSql} FROM sqlitestudio_temp_table;`,
      'DROP TABLE sqlitestudio_temp_table;'
    ]
  }

  hasTable = (db: Database.Database, tableName: Values<typeof TableClass>) => {
    try {
      const stmt = db.prepare(
        `select * from sqlite_master where type = 'table' and name = '${tableName}'`
      )
      const result = stmt.get()
      return result ? true : false
    } catch (err: any) {
      Log.error(`DatabaseHelp => hasTable: ${err.message}`)
      return false
    }
  }

  initTable = (db: Database.Database, tableSchema: SchemaType) => {
    try {
      const hasTableStmt = db.prepare(
        `select * from sqlite_master where type = 'table' and name = '${tableSchema.tableName}'`
      )
      const insertMany = db.transaction(() => {
        const hasTable = hasTableStmt.get()
        if (hasTable) {
          const tableInfo = db.pragma(`table_info(${tableSchema.tableName})`) as DatabaseColumn[]
          const updateSqls = this.generateUpdateTableSql(tableSchema, tableInfo)

          db.pragma('foreign_keys = 0')
          for (const sql of updateSqls) {
            const stmt = db.prepare(sql)
            stmt.run()
          }
          db.pragma('foreign_keys = 1')
        } else {
          const createSqls = this.generateCreateTableSql(tableSchema)
          for (const sql of createSqls) {
            const stmt = db.prepare(sql)
            stmt.run()
          }
        }
      })
      insertMany()
    } catch (err: any) {
      Log.error(`DatabaseHelp => initTable: ${err.message}`)
    }
  }
}

export default new DatabaseHelp()
