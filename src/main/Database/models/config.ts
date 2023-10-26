import { ConfigKey, ConfigValue } from '~/constant/config'
import { TableClass } from '~/constant/database'
import { configStringify } from '~/utils/Config'
import Log from '~/utils/Log'
import { PropertiesType } from '../schema'
import database from '../sqlite'

const TableName = TableClass.CONFIG
type Config = PropertiesType[typeof TableName]

export const getAllConfig = async () => {
  try {
    const db = await database.getDatabase()
    const stmt = db.prepare<{ isDeleted: 0 | 1 }>(
      `SELECT * FROM ${TableName} WHERE isDeleted = $isDeleted`
    )
    const result = stmt.all({
      isDeleted: 0
    }) as Config[]
    return result || []
  } catch (err: any) {
    Log.error(`ConfigModel => getAllConfig: ${err.message}`)
    return []
  }
}

export const upsertConfig = async <K extends ConfigKey>(key: K, value: ConfigValue<K>) => {
  try {
    const db = await database.getDatabase()
    const stringify = configStringify(value)
    const stmt = db.prepare<{ key: string; isDeleted: 0 | 1 }>(
      `SELECT id FROM ${TableName} WHERE key = $key AND isDeleted = $isDeleted`
    )
    const rowId = stmt.get({
      key: key,
      isDeleted: 0
    }) as Pick<Config, 'id'>
    if (rowId) {
      const updateStmt = db.prepare<
        {
          id: number
        } & Pick<Config, 'value' | 'valueType' | 'updateAt'>
      >(
        `UPDATE ${TableName} set value = $value, valueType = $valueType, updateAt = $updateAt WHERE id = $id`
      )
      updateStmt.run({
        id: rowId.id,
        value: stringify.value,
        valueType: stringify.valueType,
        updateAt: new Date().getTime()
      })
      return true
    } else {
      const insertStmt = db.prepare<Omit<Config, 'id'>>(
        `INSERT INTO ${TableName} (key, value, valueType, updateAt, createAt, isDeleted) VALUES ($key, $value, $valueType, $updateAt, $createAt, $isDeleted)`
      )
      insertStmt.run({
        key: key,
        value: stringify.value,
        valueType: stringify.valueType,
        updateAt: new Date().getTime(),
        createAt: new Date().getTime(),
        isDeleted: 0
      })
      return true
    }
  } catch (err: any) {
    Log.error(`ConfigModel => upsertConfig: ${err.message}`)
    return false
  }
}
