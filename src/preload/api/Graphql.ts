import { RendererInvokeEventName } from '~/constant/event'
import { getSdk } from '~/utils/Graphql'
import IPC from '../common/IPC'

const Graphql = getSdk(async (doc: string, vars?: any) => {
  const result = await IPC.invoke(RendererInvokeEventName.Graphql, {
    source: doc,
    variableValues: vars
  })
  return result.data as any
})

export default Graphql
