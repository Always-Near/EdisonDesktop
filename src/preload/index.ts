import { contextBridge } from 'electron'
import ConfigEvent from './api/ConfigEvent'
import Graphql from './api/Graphql'
import ThemeEvent from './api/ThemeEvent'

contextBridge.exposeInMainWorld('ConfigEvent', ConfigEvent)
contextBridge.exposeInMainWorld('ThemeEvent', ThemeEvent)
contextBridge.exposeInMainWorld('Graphql', Graphql)

declare global {
  interface Window {
    ConfigEvent: typeof ConfigEvent
    ThemeEvent: typeof ThemeEvent
    Graphql: typeof Graphql
  }
}
