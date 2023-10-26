import { ThemeMode } from './app'

export const ConfigScope = {
  Global: 0,
  Account: 1
} as const

export const ConfigKeys = {
  AppearanceTheme: 'AppearanceTheme'
} as const

export const ConfigValueType = {
  Boolean: 'boolean',
  Number: 'number',
  String: 'string',
  Date: 'date'
} as const

export const ConfigSchema = {
  [ConfigKeys.AppearanceTheme]: {
    key: 'AppearanceTheme',
    type: ConfigValueType.String,
    defaultValue: ThemeMode.AUTO,
    scope: ConfigScope.Global
  }
} as const

type BaseTypeEnum = {
  boolean: boolean
  number: number
  string: string
  date: Date
}

export type ConfigKey = Values<typeof ConfigKeys>
export type ConfigValue<C extends ConfigKey> = BaseTypeEnum[(typeof ConfigSchema)[C]['type']]
export type ConfigValues = Values<BaseTypeEnum>
export type ConfigObject<K extends ConfigKey> = {
  key: (typeof ConfigSchema)[K]['key']
  value: ConfigValue<K>
  updateAt: Date
  createAt: Date
}
