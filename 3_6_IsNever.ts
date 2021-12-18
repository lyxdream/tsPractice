// 6、IsNever
// 判断是否为never类型
//使用场景
//一个函数不会执行结束。用于定时任务
// 所有类型都不可以赋值给never类型，只有never类型可以赋值给never类型

type IsNever<T> = [T] extends [never] ? true : false

type A0 = IsNever<never> // true
type B2 = IsNever<string> // false
type C2 = IsNever<undefined> // false
type D2 = IsNever<any> // false
