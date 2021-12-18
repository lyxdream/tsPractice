// 1、OptionalKeys
// 获取对象类型中的可选属性的联合类型
//把属性去掉之后还可以赋值给原来的类型，说明属性是可选属性

export type OptionalKeys<T, K = keyof T> = K extends keyof T
  ? Omit<T, K> extends T
    ? K
    : never
  : never

type a1 = OptionalKeys<{ foo: number | undefined; bar?: string; flag: boolean }> // bar
type a2 = OptionalKeys<{ foo: number; bar?: string }> // bar
type a3 = OptionalKeys<{ foo: number; flag: boolean }> // never
type a4 = OptionalKeys<{ foo?: number; flag?: boolean }> // foo|flag
type a5 = OptionalKeys<{}>

// type A7 = { foo: number | undefined; bar?: string; flag: boolean }
// type B8 = { foo: number | undefined; flag: boolean }
// type C9 = { flag: boolean }

// let a: A7 = {} as any
// let b: B8 = {} as any
// let c: C9 = {} as any

// a = b
// a = c
