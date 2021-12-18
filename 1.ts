// let str:string|number = '';
// str =1
// str = '1'
// CapitalizeString

// 首字母大写
// 1、CapitalizeString

// type CapitalizeString<T> = T extends `${infer L}${infer R}`?R:never
// type A = CapitalizeString<'abc'>

// type CapitalizeString<T> = T extends `${infer L}${infer R}`?`${Uppercase<L>}${R}`:T
// type a1 = CapitalizeString<'handler'>       // Handler
// type a2 = CapitalizeString<'parent'>        // Parent
// type a3 = CapitalizeString<233>             // 233

//2、FirstChar
// 获取字符串字面量中的第一个字符
// type FirstChar<T> = T extends `${infer L}${infer R}`?L:never
// type A = FirstChar<'BFE'> // 'B'
// type B = FirstChar<'dev'> // 'd'
// type C = FirstChar<''> // never

// 3、LastChar
// 获取字符串字面量中的最后一个字符
// type LastChar<T,Prev=never> = T extends `${infer L}${infer R}`?LastChar<R,L>:Prev
// type A = LastChar<'BFE'> // 'E'
// type B = LastChar<'dev'> // 'v'
// type C = LastChar<''> // never
// type D = LastChar<'d'> // 'v'

// 第二种解法：
// type LastChar<T> = T extends `${infer L}${infer R}`? (R extends ''?L:LastChar<R>):''

// type A = LastChar<'BFE'> // 'E'
// type B = LastChar<'dev'> // 'v'
// type C = LastChar<''> // ''
// type D = LastChar<number> // 'v'

// 4、StringToTuple
// 字符串转换为元组类型
// type StringToTuple<T,A extends any[]=[]> = T extends `${infer L}${infer R}`?StringToTuple<R,[...A,L]>:A
// type A = StringToTuple<'BFE.dev'> // ['B', 'F', 'E', '.', 'd', 'e','v']
// type B = StringToTuple<''> // []

// 5、TupleToString
// 将字符串类型的元素转换为字符串字面量类型
// type TupleToString<T,A extends string=''> = T extends [infer L,...infer R]?
// (L extends string?TupleToString<R,`${A}${L}`>:never):A

// type A = TupleToString<['a', 'b', 'c']> // 'abc'
// type B = TupleToString<[]>              // ''
// type C = TupleToString<['a']>
// type D = TupleToString<['a',1]>         // 'a'

// 6、RepeatString<T,C>
// 复制字符T(为字符串类型)，复制次数为C, A用来累加表示复制了多少次（获取字符复制的次数），prev复制后的字符

// type RepeatString<T extends string,C,A extends any[]=[],Prev extends string = ''> =
// C extends A["length"]?Prev:RepeatString<T,C,[...A,null],`${Prev}${T}`>

// type A = RepeatString<'a', 3> // 'aaa'
// type B = RepeatString<'a', 0> // ''
// type C = RepeatString<'ab', 2> // ''








