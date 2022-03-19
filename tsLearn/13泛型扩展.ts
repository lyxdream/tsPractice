export {}
// 4.

interface Calculate4 {
  <T extends string | number>(a: T, b: T): void
}

//只能适用于对象属性上来说才是只多不少
//严格来说是子类型
let sum5: Calculate4 = function <T extends string | number>(a: T, b: T): void {}

//string 是(string | number)的子类
//(string | number)是(string | number | boolean)子类
sum5<string | number>(1, '2')

// type IsEmptyType<T> = string | number | boolean extends T ? 1 : 0
// type a = IsEmptyType<string | number> //0
