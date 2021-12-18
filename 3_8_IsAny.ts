// 8、IsAny
// 判断是否为any类型
// unknown只能赋值给unknown或者any
export type IsAny<T> = [unknown] extends [T] ? ([T] extends [string] ? true : false) : false

type A = IsAny<string> // false
type B = IsAny<any> // true
type C = IsAny<unknown> // false
type D = IsAny<never> // false
