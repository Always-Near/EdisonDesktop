import { ConfigKey, ConfigValue } from '~/constant/config'
import { getAllConfig, upsertConfig } from '~/main/Database/models/config'
import { formatConfigWithDefaultValue } from '~/utils/Config'
import Config from '../Config'

export const getConfig = async () => {
  const allConfig = await getAllConfig()
  return formatConfigWithDefaultValue(allConfig)
}

export type UpdateConfigArgs<K extends ConfigKey = ConfigKey> = {
  key: K
  value: ConfigValue<K>
}

export const updateConfig = async ({ key, value }: UpdateConfigArgs<any>) => {
  const result = await upsertConfig(key, value)

  if (!result) {
    return {
      successful: false,
      message: 'upsertConfig in Database Error'
    }
  }

  Config.onChange(key, value)

  return {
    successful: true,
    message: 'success'
  }
}
