import { GraphQLFieldConfig, GraphQLObjectType, GraphQLString } from 'graphql'
import { showMessageBox, clipboardWriteText, consoleInspect } from '~/main/Servers/app'
import { MutationResultSchema } from './mutation-result'

const consoleInspectField: GraphQLFieldConfig<any, any, { message: string }> = {
  type: MutationResultSchema,
  args: {
    message: {
      type: GraphQLString
    }
  },
  resolve: async (source: any, { message }: { message: string }) => {
    consoleInspect(message)
  }
}

const showMessageBoxField: GraphQLFieldConfig<any, any, { message: string }> = {
  type: MutationResultSchema,
  args: {
    message: {
      type: GraphQLString
    }
  },
  resolve: async (source: any, { message }: { message: string }) => {
    showMessageBox(message)
  }
}

const clipboardWriteTextField: GraphQLFieldConfig<any, any, { text: string }> = {
  type: MutationResultSchema,
  args: {
    text: {
      type: GraphQLString
    }
  },
  resolve: async (source: any, { text }: { text: string }) => {
    clipboardWriteText(text)
  }
}

const AppMutationSchema = new GraphQLObjectType({
  name: 'AppMutation',
  fields: {
    consoleInspect: consoleInspectField,
    showMessageBox: showMessageBoxField,
    clipboardWriteText: clipboardWriteTextField
  }
})

export const appField = {
  type: AppMutationSchema,
  resolve() {
    return {}
  }
}
