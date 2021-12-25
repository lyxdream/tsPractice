export {}
let married: boolean = true
let age: number = 10
let firstName: string = 'yx'
//两种定义数组的方式：
// 1、元素类型后面接上 []
let arr1: number[] = [1, 2, 3]
// 2、使用数组泛型，Array<元素类型>
let arr2: Array<number> = [4, 5, 6]
//元组类型tuple 已知元素数量和类型的数组
let zhufeng: [string, number] = ['yx', 1]

/*
枚举类型
*/

//普通枚举
enum Gender {
  GIRL,
  BOY
}
console.log(Gender.GIRL, Gender[0]) //0 GIRL
console.log(Gender.BOY, Gender[1]) //1 BOY

/*
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
console.log(Gender.GIRL, Gender[0]); //0 GIRL
console.log(Gender.BOY, Gender[1]); //1 BOY
*/

//常量枚举

const enum Colors {
  RED,
  YELLO,
  BLUE
}

let myColor = [Colors.RED, Colors.YELLO, Colors.BLUE]

// 编译之后
//var myColor = [0 /* RED */, 1 /* YELLO */, 2 /* BLUE */]

// 有初始值
/*
const enum Colors {
  RED = 2,
  YELLO,
  BLUE
}
let myColor = [Colors.RED, Colors.YELLO, Colors.BLUE]
*/
// var myColor = [2 /* RED */, 3 /* YELLO */, 4 /* BLUE */];

/*
任意类型
any
let root: any = document.getElementById('root')
root.style.color = 'red'

let element: HTMLElement | null = document.getElementById('root')
//非空断言
element!.style.color = 'green'
*/

/*
null
undefined
是其他类型的子类型
"strictNullChecks": true, 不能把 null,undefined 赋值给其他类型
*/
let x: number
x = 1
// x = undefined
// x = null

let z: undefined = undefined
let z1: null = null
let z2: any = null

let y: number | undefined | null
y = 1
y = undefined
y = null

/*
never
代表不会出现的类型
- 作为不会返回（ return ）的函数的返回值类型
*/
/*
function error(message: string): never {
  throw new Error('报错了') //直接异常结束了
  console.log('ok')
}

function loop(): never {
  while (true) {}
  console.log('ok')
}

function fn(x: number | string) {
  if (typeof x === 'number') {
    console.log(x)
  } else if (typeof x === 'string') {
    console.log(x)
  } else {
    console.log(x) //never
  }
}
*/

/*
void
代表没有任何类型
函数没有返回值，那就是void类型
strictNullChecks:false null可以赋值给void
true的时候不可以
function greeting(): void {
  return null
}
*/

function greeting(): void {
  return undefined
}

/**
 void和never区别
 void可以被赋值给null undefined   never不能包含任何类型
 返回类型为void的函数可以正常执行，返回never的函数无法正常执行
 */

/**
 Symbol
  我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库
  Symbol 是在ES2015之后成为新的原始类型,它通过 Symbol 构造函数创建
  Symbol 的值是唯一不变的
 */
const s1 = Symbol('key')
const s2 = Symbol('key')
// console.log(s1 == s2)
//exNext

/*
BigInt
使用 BigInt 可以安全地存储和操作大整数
我们在使用 BigInt 的时候，必须添加 ESNext 的编译辅助库
要使用1n需要 "target": "ESNext"
number和 BigInt类型不一样,不兼容

js类型Number BigInt   ts类型 number bigint
*/
// const max = Number.MAX_SAFE_INTEGER // 2**53-1
// console.log(max + 1 === max + 2) //true

// const max = BigInt(Number.MAX_SAFE_INTEGER)
// console.log(max + BigInt(1) == max + BigInt(2))   //false
// console.log(max + 1n == max + 2n) //  "target": "ESNEXT",  ////false
let foo: bigint
let bar: number
// foo = bar
// bar = foo




/*
类型推导
*/
let unname
unname = 1
unname = 'yx'
unname = null

// let unname2 = 'yx'
// unname2 = true

/*
包装对象 wrapper object
原始类型 对象类型 
*/

let name2 = 'yx'
//如果是原始类型 内部自动包装成对象类型
console.log(name2.toUpperCase())
console.log(new String(name2).toUpperCase())

let isOk1: boolean = true
let isOk2: boolean = Boolean(1)
// let isOk3: boolean = new Boolean(1) //不能将对象类型赋值给boolean



/*
联合类型
*/
let name3: string | number
console.log(name3!.toString()) //报错
name3 = 3
console.log(name3.toFixed(2))
name3 = 'yx'
console.log(name3!.length)

/*
类型断言
! 非空断言
*/
let name4: string | number
console.log((name4! as number).toFixed(2))
console.log((name4! as string).length)
// console.log(name4! as boolean) //报错
//双重断言
console.log(name4! as any as boolean)

/*
字面量类型和类型字面量
*/

//字面量类型
const up: 'Up' = 'Up'
const down: 'Down' = 'Down'
const left: 'Left' = 'Left'
const right: 'Right' = 'Right'

type Direction = 'Up' | 'Down' | 'Left' | 'Right'
//可以实现枚举的效果
function move(direction: Direction) {}
move('Down')

//类型字面量
type Person = {
  name: string
  age: number
}
let p1: Person = {
  name: 'yx',
  age: 10
}

//字符串字面量和联合类型
type T1 = '1' | '2' | '3'
type T2 = string | number | boolean

let t1: T1 = '2'
let t2: T2 = true
