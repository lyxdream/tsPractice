// 1、LengthOfTuple
//计算元组类型的长度
type LengthOfTuple<T, K extends any[] = []> = T extends [infer L, ...infer R]
  ? LengthOfTuple<R, [...K, L]>
  : K['length']

// export type A = LengthOfTuple<['B', 'F', 'E']> // 3
// export type B = LengthOfTuple<[]> // 0

// 2、FirstItem
//得到元组类型中的第一个元素
type FirstItem<T> = T extends [infer L, ...infer R] ? L : never

// export type C = FirstItem<[string, number, boolean]> // string
// export type D = FirstItem<['B', 'F', 'E']> // 'B'

//3、LastItem
//得到元组类型中的最后一个元素
type LastItem<T, Prev = never> = T extends [infer L, ...infer R] ? LastItem<R, L> : Prev

// export type G = LastItem<[string, number, boolean]> // boolean
// export type E = LastItem<['B', 'F', 'E']> // 'E'
// export type F = LastItem<[]> // never

// 4、Shift
// 移除元组类型中的第一个类型
type Shift<T, Prev = []> = T extends [infer L, ...infer R] ? R : Prev

// type ShiftA = Shift<[1, 2, 3]> // [2,3]
// type ShiftaB = Shift<[1]> // []
// type ShiftaC = Shift<[]> // []

//5、Push
// 在元组类型T中添加新的类型I
type Push<T, I> = T extends [infer L, ...infer R] ? [...T, I] : [I]
// type A = Push<[1, 2, 3], 4> // [1,2,3,4]
// type B = Push<[1], 2> // [1, 2]

//6、ReverseTuple
//反转元组
type ReverseTuple<T, A extends any[] = []> = T extends [infer L, ...infer R]
  ? ReverseTuple<R, [L, ...A]>
  : A
// type A = ReverseTuple<[string, number, boolean]> // [boolean, number, string]
// type B = ReverseTuple<[1, 2, 3]> // [3,2,1]
// type C = ReverseTuple<[]> // []

//7、Flat
// 拍平元组
type Flat<T> = T extends [infer L, ...infer R]
  ? [...(L extends any[] ? Flat<L> : [L]), ...Flat<R>]
  : T

// type A = Flat<[1, 2, 3]> // [1,2,3]
// type B = Flat<[1, [2, 3], [4, [5, [6]]]]> // [1,2,3,4,5,6]
// type C = Flat<[]> // []
// type D = Flat<[1]> // [1]
// type E = Flat<[[1, 2, 3], 5, '']> // [1]
// type k = Flat<''> // []

// 8、Repeat<T,C>
// 复制类型T为C个元素的元组类型
type Repeat<T, C, A extends any[] = []> = C extends A['length'] ? A : Repeat<T, C, [...A, T]>

// type A = Repeat<number, 3> // [number, number, number]
// type B = Repeat<string, 2> // [string, string]
// type C = Repeat<1, 1> // [1]
// type D = Repeat<0, 0> // []

// 9、Filter<T,A>
// 保留元组类型T中的A类型
// extends这个字段会触发ts分发机制  any被看做所有类型的联合类型了
//any
type Filter<T, Y, A extends any[] = []> = T extends [infer L, ...infer R]
  ? Filter<R, Y, [L] extends [Y] ? [...A, L] : A>
  : A

// type A = Filter<[1, 'BFE', 2, true, 'dev'], number> // [1, 2]
// type B = Filter<[1, 'BFE', 2, true, 'dev'], string> // ['BFE', 'dev']
// type C = Filter<[1, 'BFE', 2, any, 'dev'], string> // ['BFE', any, 'dev']

// 10 FindIndex<T,E>
// 找出E类型在元组类型T中的下标

type FindIndex<T, S, A extends any[] = []> = T extends [infer L, ...infer R]
  ? [L] extends [S]
    ? L
    : FindIndex<R, S, [...A, L]>
  : never

// type A = [any, never, 1, '2', true]
// type B = FindIndex<A, 1> // 2
// type C = FindIndex<A, 3> // never
