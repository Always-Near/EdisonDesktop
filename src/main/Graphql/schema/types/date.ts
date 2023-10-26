import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'

export const GraphQLDate = new GraphQLScalarType<Date, number>({
  name: 'Date',
  description: 'Date custom scalar type',
  // 将标量的后端表示转换为与 JSON 兼容的格式, 以便 Apollo Server 可以将其包含在操作响应中
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime()
    } else if (typeof value === 'number') {
      return value
    } else {
      throw new TypeError(`Value is not an instance of Date or number: ${value}`)
    }
  },
  // 解析参数: 当标量作为变量传入时, 将标量的 JSON 值解析成后端表示值并添加到解析器的args
  parseValue(value) {
    // value 将会是类似字符串: "2022-11-10T09:55:44.092Z"
    const date = new Date(value as string)
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Value is not a valid Date: ${value}`)
    }
    return date
  },
  // 解析参数: 当标量不是作为变量传入, 而是硬编码在请求语句中, 将标量的 JSON 值解析成后端表示值并添加到解析器的args
  parseLiteral(valueAST) {
    if (!('value' in valueAST)) {
      throw new GraphQLError(`Value is not a valid Date, kind is ${valueAST.kind}`)
    }
    let result: Date | null = null
    if (valueAST.kind === Kind.INT || valueAST.kind === Kind.FLOAT) {
      result = new Date(Number(valueAST.value))
    }
    if (valueAST.kind === Kind.STRING) {
      result = new Date(valueAST.value as string)
    }
    if (!result || Number.isNaN(result.getTime())) {
      throw new GraphQLError(`Value is not a valid Date: ${valueAST.value}`)
    }
    return result
  }
})
