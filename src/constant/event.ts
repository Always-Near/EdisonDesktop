import { GraphQLArgs } from 'graphql'
import { ConfigKey, ConfigValue } from './config'

export const RendererInvokeEventName = {
  Graphql: 'graphql'
} as const

export const MainSendEventName = {
  OnConfigChange: 'OnConfigChange',
  OnDarkModeUpdate: 'OnDarkModeUpdate'
} as const

export type EventParams = {
  [RendererInvokeEventName.Graphql]: Pick<GraphQLArgs, 'source' | 'variableValues'>
  [MainSendEventName.OnConfigChange]: { key: ConfigKey; value: ConfigValue<ConfigKey> }
  [MainSendEventName.OnDarkModeUpdate]: boolean
}
