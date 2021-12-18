// 9、Redux Connect
// 实现Connect类型，能够自动地转化Redux Module对象中的函数类型

interface Module {
  count: number
  message: string
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}

interface Action<T> {
  payload?: T
  type: string
}

// // 这个要求的结果
type Result = {
  asyncMethod<T, U>(input: T): Action<U>
  syncMethod<T, U>(action: T): Action<U>
}

// 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
// 只要函数类型的属性；
// 如果函数是异步函数，要求自动解析出来Promise中的类型；

type FuncKeys<T, K = keyof T> = K extends keyof T
  ? T[K] extends (...args: any) => any
    ? K
    : never
  : never
type InferParamType<Q> = Q extends <T, U>(input: Promise<T>) => Promise<Action<U>>
  ? <T, U>(input: T) => Action<U>
  : Q extends <T, U>(action: Action<T>) => Action<U>
  ? <T, U>(action: T) => Action<U>
  : Q
type InferReturnType<Q> = Q extends (...args: infer A) => Promise<infer R>
  ? (...args: A) => Action<R>
  : Q

export type Connect<T> = {
  [k in FuncKeys<T>]: InferReturnType<InferParamType<T[k]>>
}

type A = Connect<Module>
let result: Result = {} as any
let g: A = result

// type InferConnectFunctionParameterType<Func> = Func extends <T, U>(
//   input: Promise<T>
// ) => Promise<Action<U>>
//   ? <T, U>(input: T) => Action<U>
//   : Func extends <T, U>(input: Action<T>) => Action<U>
//   ? <T, U>(input: T) => Action<U>
//   : never

// type Connect<
//   T,
//   M extends string = {
//     [k in keyof T]: k extends string ? (T[k] extends Function ? k : never) : never
//   }[keyof T]
// > = {
//   [k in M]: k extends keyof T ? InferConnectFunctionParameterType<T[k]> : never
// }

// type Result2 = Connect<Module>



// isEmptyType
// export default {}

// type IsEmptyType<T> = number extends T
//     ? keyof T extends never
//         ? T extends {}
//             ? true
//             : false
//         : false
//     : false

// type A = IsEmptyType<string> // false
// type B = IsEmptyType<{ a: 3 }> // false
// type C = IsEmptyType<{}> // true
// type D = IsEmptyType<any> // false
// type E = IsEmptyType<object> // false
// type F = IsEmptyType<Object> // false
// type G = IsEmptyType<unknown> // false

// 原始数据类型不可以赋值给另一个原始数据类型 number不可以赋值给object
// 包装数据类型可以赋值给原始数据类型，比如 Number可以赋值给object

/*let v1 = {} as object
let v2 = {} as const
let v3 = 1
v1 = v3
v2 = v3*/