// 1、类和接口需要一个范围大于等于另一个才可以赋值
//2、基本数据类型要一个小于等于另一个范围才可以赋值

// 1.接口的兼容性

//一个接口需要的，另一个接口都有就兼容
export {}
interface Animal {
  name: string
  age: number
}

interface Person {
  name: string
  age: number
  gender: number
}

function getName(a: Animal): string {
  return a.name
}

let a: Animal = {
  name: '',
  age: 10
}
getName(a)

//报错，缺少age属性
// let p: Person = {
//   name: '',
//   gender: 0
// }
// getName(p)

//正常
let p1: Person = {
  name: '',
  age: 10,
  gender: 0
}
getName(p1)

// 2.基本数据类型的兼容性
let num: string | number
let str: string = 'li'
num = str

let num2: {
  toString(): string
}

let str2: string = 'yx'
num2 = str2

//3.类的兼容性
namespace ab {
  class Animal {
    name!: string
  }
  class Bird extends Animal {
    age!: number
  }
  let a: Animal
  let b: Bird
  // a = b
  // b = a
}

//4、函数的兼容性

// 函数的参数只能少不能多，函数的返回值只能多不能少

//(1)比较参数  比较返回值
type Func = (a: number, b: number) => void
let sum: Func
function f1(a: number, b: number): void {}
sum = f1

//参数少一个可以
function f2(a: number): void {}
sum = f2

function f3(): void {}
sum = f3

//多一个参数会报错
function f4(a: number, b: number, c: number): void {}
// sum = f4 //报错
// 类比map函数，传的可以是一个也可以是2个
sum(1, 2)

// (2)比较返回值

type GetPerson = () => { name: string; age: number }
let getPerson: GetPerson

function g1() {
  return { name: 'yx', age: 20 }
}
getPerson = g1

//多一个返回值
function g2() {
  return { name: 'yx', age: 20, gender: 10 }
}
getPerson = g2

//少一个返回值
function g3() {
  return { name: 'yx' }
}
// getPerson = g3  //报错

// 5.泛型的兼容性
// 泛型在判断兼容性的时候会先判断具体的类型,然后再进行兼容性判断
interface Empty<T> {
  data: T
}
let x!: Empty<string> //{data:string}
let y!: Empty<number> //{data:number}
// x = y

// 6.枚举的兼容性
// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容
// 不同枚举类型之间是不兼容的

enum Colors {
  Red,
  Yellow
}

let c: Colors
c = Colors.Red
c = 1

let n: number
n = 1
n = Colors.Red
