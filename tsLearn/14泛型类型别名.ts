//类型别名
// 泛型类型别名可以表达更复杂的类型
type Cart<T> = { list: T[] } | T[]
let c1: Cart<string> = { list: ['1'] }
let c2: Cart<number> = [1]

// 泛型接口 vs 泛型类型别名
// 能用interface 实现的不用type

