// 12、UnionPop
// 取出来联合类型中的任意一个类型

// type a = 1 | 2 | 3
// type b = UnionPop<a>;       // 3

/*(1)
type unionPop<T, K = T> = (K extends T ? (p: K) => any : never) extends (p: infer P) => any
  ? P
  : never
*/

/*(2)
type unionPop<T, K = T> = (K extends T ? (p: (p: K) => any) => any : never) extends (
  p: infer P
) => any
  ? P
  : never
*/

/*(3)  boolean 和any需要做特殊处理
type unionPop<T, K = T> = (
  (K extends T ? (p: (p: K) => any) => any : never) extends (p: infer P) => any ? P : never
) extends (p: infer P) => any
  ? P
  : never
*/
import { IsAny } from './3_8_IsAny'

export type unionPop<T, K = T> = IsAny<T> extends true
  ? any
  : [boolean] extends [T]
  ? boolean
  : (
      (K extends T ? (p: (p: K) => any) => any : never) extends (p: infer P) => any ? P : never
    ) extends (p: infer P) => any
  ? P
  : never

type A0 = unionPop<{ a: string } | { b: number } | { c: boolean }> // { c: boolean }
type A1 = unionPop<1 | 2 | 3> //3
type A2 = unionPop<string | number | boolean> //boolean
type A3 = unionPop<string | number | boolean | 1 | '123'> //boolean
type A4 = unionPop<string | number | 1 | '221' | any>  //any
type A5 = unionPop<string | number | true>  //true


type A = ((p: { a: string }) => { aa: string }) &
  ((p: { b: string }) => { bb: string }) &
  ((p: { c: string }) => { cc: string })

//函数重载

// type ParamType = A extends (p: infer P) => any ? P : never
// type Return_Type = A extends (...args: any[]) => infer R ? R : never

// const fun: A = {} as any
// console.log(fun({ a: '' }).a)
// console.log(fun({ b: '' }).b)
// console.log(fun({ c: '' }).c)

// function fun2(p: { a: string }): { a: string }
// function fun2(p: { b: string }): { b: string }
// function fun2(p: { c: string }): { c: string }
// function fun2(val:any){return {} as any}

// console.log(fun2({ a: '' }).a)
// console.log(fun2({ b: '' }).b)
// console.log(fun2({ c: '' }).c)

// type A = string | number | boolean;
// type B = A | any;    //any联合任何类型都是any
// type C = A | never;  //never 联合任意类型都是never


