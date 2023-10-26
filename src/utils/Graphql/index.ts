/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ConfigKey: 'AppearanceTheme' | 'MaxmumConcurrentRequests' | 'DelayBetweenRequests' | 'NotePath' | 'NoteFilter';
  ConfigValue: string | number | boolean | Date;
  Date: Date;
};

export type AppMutation = {
  __typename?: 'AppMutation';
  clipboardWriteText?: Maybe<MutationResult>;
  showMessageBox?: Maybe<MutationResult>;
};


export type AppMutationClipboardWriteTextArgs = {
  text?: InputMaybe<Scalars['String']>;
};


export type AppMutationShowMessageBoxArgs = {
  message?: InputMaybe<Scalars['String']>;
};

export type AppQuery = {
  __typename?: 'AppQuery';
  electronVersion?: Maybe<Scalars['String']>;
  isDarkMode?: Maybe<Scalars['Boolean']>;
  nodeVersion?: Maybe<Scalars['String']>;
  themeMode?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type ConfigMutation = {
  __typename?: 'ConfigMutation';
  updateConfig?: Maybe<MutationResult>;
};


export type ConfigMutationUpdateConfigArgs = {
  key?: InputMaybe<Scalars['ConfigKey']>;
  value?: InputMaybe<Scalars['ConfigValue']>;
};

export type ConfigQuery = {
  __typename?: 'ConfigQuery';
  AppearanceTheme?: Maybe<Scalars['String']>;
  DelayBetweenRequests?: Maybe<Scalars['Float']>;
  MaxmumConcurrentRequests?: Maybe<Scalars['Float']>;
  NoteFilter?: Maybe<Scalars['String']>;
  NotePath?: Maybe<Scalars['String']>;
};

export type DictFileQuery = {
  __typename?: 'DictFileQuery';
  fileName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<Maybe<Scalars['String']>>>;
  typeId?: Maybe<Scalars['Int']>;
};

export type DictTypeQuery = {
  __typename?: 'DictTypeQuery';
  files?: Maybe<Array<Maybe<DictFileQuery>>>;
  id?: Maybe<Scalars['Int']>;
  typeName?: Maybe<Scalars['String']>;
};

export type FsIsDirQuery = {
  __typename?: 'FsIsDirQuery';
  errorMsg?: Maybe<Scalars['String']>;
  isDir?: Maybe<Scalars['Boolean']>;
};

export type FsQuery = {
  __typename?: 'FsQuery';
  isDir?: Maybe<FsIsDirQuery>;
  readDir?: Maybe<Array<Maybe<ReadDirFileQuery>>>;
};


export type FsQueryIsDirArgs = {
  dirPath?: InputMaybe<Scalars['String']>;
};


export type FsQueryReadDirArgs = {
  dirPath?: InputMaybe<Scalars['String']>;
};

export type MutationResult = {
  __typename?: 'MutationResult';
  message?: Maybe<Scalars['String']>;
  successful?: Maybe<Scalars['Boolean']>;
};

export type ReadDirFileQuery = {
  __typename?: 'ReadDirFileQuery';
  isDir?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type RootMutationType = {
  __typename?: 'RootMutationType';
  app?: Maybe<AppMutation>;
  config?: Maybe<ConfigMutation>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  app?: Maybe<AppQuery>;
  config?: Maybe<ConfigQuery>;
  dictType?: Maybe<Array<Maybe<DictTypeQuery>>>;
  fs?: Maybe<FsQuery>;
};

export type GetAppInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppInfoQuery = { __typename?: 'RootQueryType', app?: { __typename?: 'AppQuery', version?: string | null, nodeVersion?: string | null, electronVersion?: string | null, themeMode?: string | null, isDarkMode?: boolean | null } | null };

export type ClipboardWriteTextMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type ClipboardWriteTextMutation = { __typename?: 'RootMutationType', app?: { __typename?: 'AppMutation', clipboardWriteText?: { __typename?: 'MutationResult', successful?: boolean | null, message?: string | null } | null } | null };

export type ShowMessageBoxMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type ShowMessageBoxMutation = { __typename?: 'RootMutationType', app?: { __typename?: 'AppMutation', showMessageBox?: { __typename?: 'MutationResult', successful?: boolean | null, message?: string | null } | null } | null };

export type GetConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConfigQuery = { __typename?: 'RootQueryType', config?: { __typename?: 'ConfigQuery', AppearanceTheme?: string | null, MaxmumConcurrentRequests?: number | null, DelayBetweenRequests?: number | null, NotePath?: string | null, NoteFilter?: string | null } | null };

export type UpdateConfigMutationVariables = Exact<{
  key: Scalars['ConfigKey'];
  value: Scalars['ConfigValue'];
}>;


export type UpdateConfigMutation = { __typename?: 'RootMutationType', config?: { __typename?: 'ConfigMutation', updateConfig?: { __typename?: 'MutationResult', successful?: boolean | null, message?: string | null } | null } | null };

export type IsDirQueryVariables = Exact<{
  dirPath: Scalars['String'];
}>;


export type IsDirQuery = { __typename?: 'RootQueryType', fs?: { __typename?: 'FsQuery', isDir?: { __typename?: 'FsIsDirQuery', isDir?: boolean | null, errorMsg?: string | null } | null } | null };

export type ReadDirQueryVariables = Exact<{
  dirPath?: InputMaybe<Scalars['String']>;
}>;


export type ReadDirQuery = { __typename?: 'RootQueryType', fs?: { __typename?: 'FsQuery', readDir?: Array<{ __typename?: 'ReadDirFileQuery', isDir?: boolean | null, name?: string | null, path?: string | null } | null> | null } | null };


export const GetAppInfoDocument = `
    query GetAppInfo {
  app {
    version
    nodeVersion
    electronVersion
    themeMode
    isDarkMode
  }
}
    `;
export const ClipboardWriteTextDocument = `
    mutation ClipboardWriteText($text: String!) {
  app {
    clipboardWriteText(text: $text) {
      successful
      message
    }
  }
}
    `;
export const ShowMessageBoxDocument = `
    mutation ShowMessageBox($message: String!) {
  app {
    showMessageBox(message: $message) {
      successful
      message
    }
  }
}
    `;
export const GetConfigDocument = `
    query GetConfig {
  config {
    AppearanceTheme
    MaxmumConcurrentRequests
    DelayBetweenRequests
    NotePath
    NoteFilter
  }
}
    `;
export const UpdateConfigDocument = `
    mutation UpdateConfig($key: ConfigKey!, $value: ConfigValue!) {
  config {
    updateConfig(key: $key, value: $value) {
      successful
      message
    }
  }
}
    `;
export const IsDirDocument = `
    query IsDir($dirPath: String!) {
  fs {
    isDir(dirPath: $dirPath) {
      isDir
      errorMsg
    }
  }
}
    `;
export const ReadDirDocument = `
    query ReadDir($dirPath: String) {
  fs {
    readDir(dirPath: $dirPath) {
      isDir
      name
      path
    }
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: string, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetAppInfo(variables?: GetAppInfoQueryVariables, options?: C): Promise<GetAppInfoQuery> {
      return requester<GetAppInfoQuery, GetAppInfoQueryVariables>(GetAppInfoDocument, variables, options) as Promise<GetAppInfoQuery>;
    },
    ClipboardWriteText(variables: ClipboardWriteTextMutationVariables, options?: C): Promise<ClipboardWriteTextMutation> {
      return requester<ClipboardWriteTextMutation, ClipboardWriteTextMutationVariables>(ClipboardWriteTextDocument, variables, options) as Promise<ClipboardWriteTextMutation>;
    },
    ShowMessageBox(variables: ShowMessageBoxMutationVariables, options?: C): Promise<ShowMessageBoxMutation> {
      return requester<ShowMessageBoxMutation, ShowMessageBoxMutationVariables>(ShowMessageBoxDocument, variables, options) as Promise<ShowMessageBoxMutation>;
    },
    GetConfig(variables?: GetConfigQueryVariables, options?: C): Promise<GetConfigQuery> {
      return requester<GetConfigQuery, GetConfigQueryVariables>(GetConfigDocument, variables, options) as Promise<GetConfigQuery>;
    },
    UpdateConfig(variables: UpdateConfigMutationVariables, options?: C): Promise<UpdateConfigMutation> {
      return requester<UpdateConfigMutation, UpdateConfigMutationVariables>(UpdateConfigDocument, variables, options) as Promise<UpdateConfigMutation>;
    },
    IsDir(variables: IsDirQueryVariables, options?: C): Promise<IsDirQuery> {
      return requester<IsDirQuery, IsDirQueryVariables>(IsDirDocument, variables, options) as Promise<IsDirQuery>;
    },
    ReadDir(variables?: ReadDirQueryVariables, options?: C): Promise<ReadDirQuery> {
      return requester<ReadDirQuery, ReadDirQueryVariables>(ReadDirDocument, variables, options) as Promise<ReadDirQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;