// 10、FindIndex<T,E>
// 找出E类型在元组类型T中的下标
import { Equal } from './13_equal'

export type FindIndex<T extends any[], E, A extends any[] = []> = T extends [infer L, ...infer R]
  ? Equal<L, E> extends true
    ? A['length']
    : FindIndex<R, E, [...A, L]>
  : never

type A = [any, never, 1, '2', true]
type B = FindIndex<A, 1> // 2
type C = FindIndex<A, 3> // never
type D = FindIndex<A, true> //4
