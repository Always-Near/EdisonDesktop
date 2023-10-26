import Database from 'better-sqlite3'
import Config from '~/config'
import { TableClass } from '~/constant/database'
import Log from '~/utils/Log'
import DatabaseHelp from '../help'
import { AllTableSchemas, PropertiesType } from '../schema'

const TableName = TableClass.APP
type App = PropertiesType[typeof TableName]

class DatabaseOpenHelp {
  private shouldUpdataDb = (db: Database.Database, nowVersion: number) => {
    try {
      const hasAppTable = DatabaseHelp.hasTable(db, TableClass.APP)
      if (!hasAppTable) {
        return true
      }

      const stmt = db.prepare<{ key: string; isDeleted: 0 | 1 }>(
        `SELECT * FROM ${TableClass.APP} WHERE key = $key AND isDeleted = $isDeleted`
      )
      const result = stmt.get({
        key: 'schemaVersion',
        isDeleted: 0
      }) as App

      if (!result) {
        return true
      }

      const oldVersion = parseInt(result.value)
      if (nowVersion > oldVersion) {
        return true
      }
      return false
    } catch (err: any) {
      Log.error(`DatabaseOpenHelp => shouldUpdataDb: ${err.message}`)
      return true
    }
  }

  private flagVersionn = (db: Database.Database, version: number) => {
    try {
      const stmt = db.prepare<{ key: string; isDeleted: 0 | 1 }>(
        `SELECT * FROM ${TableClass.APP} WHERE key = $key AND isDeleted = $isDeleted`
      )
      const result = stmt.get({
        key: 'schemaVersion',
        isDeleted: 0
      }) as App
      const upsertData = {
        key: 'schemaVersion',
        value: `${version}`,
        updateAt: new Date().getTime(),
        createAt: new Date().getTime(),
        isDeleted: 0
      } as const
      if (result) {
        const updateStmt = db.prepare<
          {
            id: number
          } & Pick<App, 'value' | 'updateAt'>
        >(`UPDATE ${TableName} set value = $value, updateAt = $updateAt WHERE id = $id`)
        updateStmt.run({ id: result.id, ...upsertData })
      } else {
        const insertStmt = db.prepare<Omit<App, 'id'>>(
          `INSERT INTO ${TableName} (key, value, updateAt, createAt, isDeleted) VALUES ($key, $value, $updateAt, $createAt, $isDeleted)`
        )
        insertStmt.run(upsertData)
      }
    } catch (err: any) {
      Log.error(`DatabaseOpenHelp => flagVersionn: ${err.message}`)
    }
  }

  initAllTables = async (db: Database.Database) => {
    const nowVersion = Config.get('DATABASE_SCHEMA_VERSION')
    const update = this.shouldUpdataDb(db, nowVersion)
    if (update) {
      for (const schema of AllTableSchemas) {
        DatabaseHelp.initTable(db, schema)
      }
    }
    this.flagVersionn(db, nowVersion)
  }
}

export default new DatabaseOpenHelp()
