// 第一步
/*
let a: [any] = window as any
let b: [1] = [1]
a = b //元组可以赋值给any
b = a
*/
/*
任何类型都可以赋值给any类型，any类型也可以赋值给任意类型
但是如下情况是不可以的
let a: [1 | 2] = window as any
let b: [1] = [1]
a = b
b = a //出错
 */

/*
判断any和其他类型是否相等
通过keyof 
 */
// type Q = keyof 1
// type W = keyof any

export type Equal<T, K> = [T] extends [K]
  ? [K] extends [T]
    ? keyof T extends keyof K
      ? keyof K extends keyof T
        ? true
        : false
      : false
    : false
  : false


//分发
// type a = any extends number ? 1 : 2 //1 | 2
// type b = [any] extends [number] ? 1 : 2 // 1
type a = number extends any ? 1 : 2 //1 | 2
type b = any extends number ? 1 : 2 // 1

type A1 = Equal<any, any> // true

type A2 = Equal<any, 1> // false
type A3 = Equal<never, never> // true
type A4 = Equal<'BFE', 'BFE'> // true
type A5 = Equal<'BFE', string> // false
type A6 = Equal<1 | 2, 2 | 1> // true
type A7 = Equal<{ a: number }, { a: number }> // true
