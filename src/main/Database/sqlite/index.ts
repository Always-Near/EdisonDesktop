import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import Config from '~/config'
import Log from '~/utils/Log'
import openHelp from './open-help'

const databasePath = path.join(app.getPath('userData'), Config.get('DATABASE_PATH'))

class DB {
  private db: Database.Database | undefined

  init = async () => {
    try {
      const db = new Database(databasePath)
      // 开启WAL模式以大大提高整体性能
      db.pragma('journal_mode = WAL')
      this.db = db
      await openHelp.initAllTables(db)
    } catch (err: any) {
      Log.error(`DB => init: ${err.message}`)
    }
  }

  getDatabase = async () => {
    if (this.db) {
      return this.db
    }
    await this.init()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.db!
  }
}

export default new DB()
