// 13、UnionToTuple
// 联合类型转换为元组类型
import { unionPop } from './3_12_UnionPop'
type UnionToTuple<T, Prev extends any[] = []> = [T] extends [Prev[number]]
  ? Prev
  : UnionToTuple<Exclude<T, unionPop<T>>, [unionPop<T>, ...Prev]>

type a = UnionToTuple<1 | 2 | 3> // [1,2,3]
type b = UnionToTuple<1 | string | boolean> // [1,string,boolean]
type c = UnionToTuple<any> // [any]

type Q1 = UnionToTuple<string | number | symbol> // [symbol,number,string]
type Q2 = UnionToTuple<string | number | symbol | boolean> // [boolean,symbol,number,string]
type Q3 = UnionToTuple<string | number | symbol | boolean | [boolean]> // [boolean,[boolean],symbol,number,string]

// type ExtractArrayItemType<T> = T extends (infer U)[] ? U : 1;
// type ItemTypes = ExtractArrayItemType<[string, number]>; // string | number
// // 元组类型转化为联合类型
