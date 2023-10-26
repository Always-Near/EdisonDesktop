import {
  ConfigKey,
  ConfigObject,
  ConfigSchema,
  ConfigValues,
  ConfigValueType
} from '~/constant/config'
import { Config } from '~/type'

export function configStringify(value: ConfigValues): Pick<Config, 'value' | 'valueType'> {
  if (typeof value === 'boolean') {
    return { value: value ? 'true' : 'false', valueType: ConfigValueType.Boolean }
  }
  if (typeof value === 'number') {
    return { value: `${value}`, valueType: ConfigValueType.Number }
  }
  if (value instanceof Date) {
    return { value: `${value.getTime()}`, valueType: ConfigValueType.Date }
  }
  return { value: value.toString(), valueType: ConfigValueType.String }
}

function configParse<K extends ConfigKey>(val: Config): ConfigObject<K> {
  let value: any = val.value
  switch (val.valueType) {
    case ConfigValueType.Boolean:
      value = value === 'true' ? true : false
      break
    case ConfigValueType.Number:
      value = Number(value)
      break
    case ConfigValueType.Date:
      value = new Date(Number(value))
      break
    default:
      break
  }
  return {
    key: val.key,
    value,
    createAt: new Date(val.createAt),
    updateAt: new Date(val.updateAt)
  } as ConfigObject<K>
}

export function formatConfigWithDefaultValue(configList: Config[]) {
  const configMap: Partial<Record<(typeof ConfigSchema)[ConfigKey]['key'], ConfigValues>> = {}
  Object.keys(ConfigSchema).forEach(key => {
    const schemaObj = ConfigSchema[key as ConfigKey]
    configMap[schemaObj.key] = schemaObj.defaultValue
  })

  for (const configItem of configList) {
    const configFormat = configParse(configItem)
    configMap[configFormat.key] = configFormat.value
  }

  return configMap as Record<(typeof ConfigSchema)[ConfigKey]['key'], ConfigValues>
}
