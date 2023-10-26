import { GraphQLError, Kind, GraphQLScalarType } from 'graphql'
import { ConfigKey, ConfigKeys } from '~/constant/config'

export const GraphQLConfigKeyType = new GraphQLScalarType({
  name: 'ConfigKey',
  // 将标量的后端表示转换为与 JSON 兼容的格式, 以便 Apollo Server 可以将其包含在操作响应中
  serialize(value) {
    if (typeof value != 'string') {
      throw new TypeError(`Value is not an string: ${value}`)
    }
    const validConfigKeys = Object.values(ConfigKeys)
    if (validConfigKeys.some(key => key === value)) {
      return value as ConfigKey
    }
    throw new TypeError(`Value is an not valid config key: ${value}`)
  },
  // 解析参数: 当标量作为变量传入时, 将标量的 JSON 值解析成后端表示值并添加到解析器的args
  parseValue(value) {
    if (typeof value != 'string') {
      throw new TypeError(`Value is not an string: ${value}`)
    }
    const validConfigKeys = Object.values(ConfigKeys)
    if (validConfigKeys.some(key => key === value)) {
      return value as ConfigKey
    }
    throw new TypeError(`Value is an not valid config key: ${value}`)
  },
  // 解析参数: 当标量不是作为变量传入, 而是硬编码在请求语句中, 将标量的 JSON 值解析成后端表示值并添加到解析器的args
  parseLiteral(valueAST) {
    if (!('value' in valueAST)) {
      throw new GraphQLError(`Value is not valid, kind is ${valueAST.kind}`)
    }
    if (valueAST.kind != Kind.STRING) {
      throw new GraphQLError(`Value is not an string: ${valueAST.value}`)
    }
    const validConfigKeys = Object.values(ConfigKeys)
    if (validConfigKeys.some(key => key === valueAST.value)) {
      return valueAST.value as ConfigKey
    }
    throw new GraphQLError(`Value is an not valid config key: ${valueAST.value}`)
  }
})

export const GraphQLConfigValueType = new GraphQLScalarType({
  name: 'ConfigValue',
  // 将标量的后端表示转换为与 JSON 兼容的格式, 以便 Apollo Server 可以将其包含在操作响应中
  serialize(value) {
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      return value
    } else if (value instanceof Date) {
      return value.getTime()
    } else {
      throw new TypeError(
        `Value is not an instance of Date or boolean or number or string: ${value}`
      )
    }
  },
  // 解析参数: 当标量作为变量传入时, 将标量的 JSON 值解析成后端表示值并添加到解析器的args
  parseValue(value) {
    // Date 类型的 value 将会是类似字符串: "2022-11-10T09:55:44.092Z"
    if (typeof value === 'boolean' || typeof value === 'number') {
      return value
    }
    if (value instanceof Date) {
      return value
    }
    if (typeof value != 'string') {
      throw new TypeError(
        `Value is not an instance of Date or boolean or number or string: ${value}`
      )
    }
    if (Number.isNaN(Number(value)) && !Number.isNaN(Date.parse(value))) {
      return new Date(Date.parse(value))
    }
    return value
  },
  // 解析参数: 当标量不是作为变量传入, 而是硬编码在请求语句中, 将标量的 JSON 值解析成后端表示值并添加到解析器的args
  parseLiteral(valueAST) {
    if (!('value' in valueAST)) {
      throw new GraphQLError(`Value is not valid, kind is ${valueAST.kind}`)
    }
    if (valueAST.kind === Kind.INT || valueAST.kind === Kind.FLOAT) {
      return Number(valueAST.value)
    }
    if (valueAST.kind === Kind.BOOLEAN) {
      return valueAST.value
    }
    if (valueAST.kind != Kind.STRING) {
      throw new GraphQLError(`Value is not valid: ${valueAST.value}`)
    }
    if (Number.isNaN(Number(valueAST.value)) && !Number.isNaN(Date.parse(valueAST.value))) {
      return new Date(Date.parse(valueAST.value))
    }
    return valueAST.value
  }
})
