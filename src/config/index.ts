import ConfigSetting, { EnvEnum, EnvConfig } from './constant'

type ConfigSetting = typeof ConfigSetting

let env
switch (process.env.NODE_ENV) {
  case 'production':
    env = EnvEnum.prod
    break
  default:
    env = EnvEnum.dev
}

class Config {
  private environment: Values<typeof EnvEnum>
  private config: ConfigSetting

  constructor(env: Values<typeof EnvEnum>) {
    this.environment = env
    this.config = ConfigSetting
  }

  /**
   * get the config setting in './config.ts'
   * @param {keyof ConfigSetting} key
   */
  get<K extends keyof ConfigSetting>(
    key: K
  ): ConfigSetting[K] extends EnvConfig<infer R> ? R : ConfigSetting[K] {
    const value: any = this.config[key]
    if (value && typeof value === 'object') {
      return value[this.environment]
    }
    return value
  }

  currentEnv() {
    return this.environment
  }
}

const config = new Config(env)
export default config
