export {}
// 1、Exclude
type Exclude<T, U> = T extends U ? never : T
type R1 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>

// 2、Extract
type Extract<T, U> = T extends U ? T : never
type R2 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>

// 3、NonNullable
type NonNullable<T> = T extends null | undefined ? never : T
type R3 = NonNullable<'a' | null | undefined>

// 4、ReturnType 获取函数类型的返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : T

function getUser() {
  return { name: 'yx', age: 10 }
}
type GetUserType = typeof getUser
type ReturnUser = ReturnType<GetUserType>
let u: ReturnUser = {
  name: 'yx',
  age: 22
}

// 5、Parameters  如果是函数返回函数的入参类型，如果不是返回never
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

function getUser1(name: string, age: number) {
  return { name: 'yx', age: 10 }
}
type GetUserType1 = typeof getUser1
type ParamsType = Parameters<GetUserType1>

// 6、ConstructorParameters 获取类的构造函数的参数类型
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never

class Person1 {
  name!: string
  constructor(name: string) {
    this.name = name
  }
  getName() {
    console.log(this.name)
  }
}
type Params = ConstructorParameters<typeof Person1>

//7、InstanceType获取构造函数的返回值类型
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any

type Person8Instance = InstanceType<typeof Person1>
let instance: Person8Instance = {
  name: 'zf',
  getName() {}
}

// 8、 infer+分布式
// infer 的应用实例

type ElementOf<T> = T extends Array<infer E> ? E : never
type Ttuple = [string, number, boolean]
type TupleToUnion = ElementOf<Ttuple> //string | number | boolean

type First<T> = T extends { name: infer A } ? A : never
type k11 = First<{ name: string }>

// 2、联合类型转换交叉类型  string | number =>string&number

type T1 = { name: string }
type T2 = { age: number }
type ToIntersection<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never
type T3 = ToIntersection<{ a: (x: T1) => void; b: (x: T2) => void }>
let t33: T3 = { name: '', age: 10 }
