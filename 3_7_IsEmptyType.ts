// 7、IsEmptyType
// 判断是否为没有属性的对象类型{}

// let a: {} = {}
// let b = ''
// a = b

// type a = keyof {}
// type b = keyof undefined
// type c = keyof null

export type IsEmptyType<T> = [keyof T] extends [never]
  ? [unknown] extends [T]
    ? false
    : number extends T
    ? true
    : false
  : false

type A = IsEmptyType<string> // false
type B = IsEmptyType<{ a: 3 }> // false
type D = IsEmptyType<any> // false
type F = IsEmptyType<Object> // false

type G = IsEmptyType<unknown> // false

type C = IsEmptyType<{}> // true
type E = IsEmptyType<object> // false

// 1、keyof T （unknown、{}、object的keyof都是never）

// 2、只有any或者unknown可以赋值给unknown
/*
type aa = keyof any
let val = {} as any
console.log(val.abc.def)
console.log(val[1])

let sy = Symbol('kk')
console.log(val[sy])

type AA = unknown
let a: AA = {}
let b: any = a
*/

// 3、number 不能赋值给object但是可以赋值给{}
// let b: object = 123
// let c: {} = 123
