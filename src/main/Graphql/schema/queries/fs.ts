import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { isDri, readDir } from '~/main/Servers/fs'

const isDirField: GraphQLFieldConfig<any, any, { dirPath: string }> = {
  type: new GraphQLObjectType({
    name: 'FsIsDirQuery',
    fields: {
      isDir: {
        type: GraphQLBoolean
      },
      errorMsg: {
        type: GraphQLString
      }
    }
  }),
  args: {
    dirPath: {
      type: GraphQLString
    }
  },
  resolve: (source: any, { dirPath }: { dirPath: string }) => {
    return isDri(dirPath)
  }
}

const readDirField = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: 'ReadDirFileQuery',
      fields: {
        isDir: {
          type: GraphQLBoolean
        },
        name: {
          type: GraphQLString
        },
        path: {
          type: GraphQLString
        }
      }
    })
  ),
  args: {
    dirPath: {
      type: GraphQLString
    }
  },
  resolve: (source: any, { dirPath }: { dirPath: string }) => {
    return readDir(dirPath)
  }
}

const FsQuerySchema = new GraphQLObjectType({
  name: 'FsQuery',
  fields: {
    isDir: isDirField,
    readDir: readDirField
  }
})

export const fsField = {
  type: FsQuerySchema,
  resolve() {
    return {}
  }
}
