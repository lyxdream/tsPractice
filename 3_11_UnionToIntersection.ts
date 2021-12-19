// 11、UnionToIntersection 将联合类型转换为交叉类型
// 参数是逆变的

// {a: string} & {b: string} & {c: string}

// 可以说我们允许一个函数类型中，返回值类型是协变的，而参数类型是逆变的。
// 返回值类型是协变的，意思是 A ≼ B 就意味着 (T → A) ≼ (T → B) 。
// 参数类型是逆变的，意思是 A ≼ B 就意味着 (B → T) ≼ (A → T) （ A 和 B 的位置颠倒过来了）。

// 第一步
// type UnionToIntersection<T> = T extends any ? (p: T) => any : never
// type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>
//

// 第二步
// type UnionToIntersection<T> = (T extends any ? (p: T) => any : never) extends (p: infer P) => any
//   ? P
//   : never
type A = UnionToIntersection<{ a: string } | { b: string } | { c: string }>

export type UnionToIntersection<T> = (T extends any ? (p: T) => any : never) extends (p:infer P)=>any?P:never




// 判断联合类型
// type A = 'x';
// type B = 'x' | 'y';

// type Y = A extends B ? true : false; // true
// 其中联合类型 A 的所有子类型，在联合类型 B 中存在，则条件满足。 
// 如果我们把返回值替换为其他的类型定义，就能根据判断，得出想要的类型。



// 例子
type 人类 = '人类'
type 哺乳动物 = '哺乳动物'
type 活的 = '活的'

type FunType =
  | ((p: { a: string }) => 人类)
  | ((p: { b: number }) => 哺乳动物)
  | ((p: { c: boolean }) => 活的)

const func: FunType = {} as any
const param1: { a: string } & { b: number } & { c: boolean } = '' as any
const val = func(param1)
//参数类型是逆变的
