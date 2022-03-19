export {}

//
interface Bird {
  name: string
  fly(): void
}

interface Person {
  talk(): void
}

type BirdMan = Bird & Person

//1\交集属性更具体了
let p: BirdMan = {
  name: 'yx',
  fly() {},
  talk() {}
}
p.fly()

interface X {
  a: string | number
  b: string
}
interface Y {
  a: number | boolean
  c: string
}

type XY = X & Y
type YX = Y & X
let xy: XY = { a: 1, b: '', c: '' }
let yx: YX = { a: 1, b: '', c: '' }

//2\联合类型的交叉类型
type T1 = string | number
type T2 = number | boolean
type T3 = T1 & T2 //number
type T4 = T1 | T2 // string | number | boolean

// 3\mixin混入模式可以让你从两个对象中创建一个新对象，新对象会拥有着两个对象所有的功能

interface AnyObject {
  [prop: string]: any
}

function mixin<T, U>(one: T, two: U) {
  let result = <T & U>{}
  for (let key in one) {
    ;(<T>result)[key] = one[key]
  }
  for (let key in two) {
    ;(<U>result)[key] = two[key]
  }
  return result
}

const x = mixin({ name: 'yx' }, { age: 11 })
console.log(x.name, x.age)

//4\ typeof  可以获取一个变量的类型

//先定义类型，再定义变量
type People = {
  name: string
}
let p1: People = {
  name: 'yx'
}

// 先定义变量，再定义类型

let p4 = {
  name: 'yx'
}
type p4 = typeof p4

// 5\索引访问操作符

interface Person4 {
  name: string
  age: number
  job: {
    name: string
  }
}

let frontEndJob: Person4['job'] = {
  name: '前端'
}

//6\映射类型

interface Person5 {
  name: string
  gae: number
  gender: 'male' | 'female'
}
//可以把一个接口中的属性全部变成可选的

// type Partial<T> = {
//   [key in keyof T]?: T[key]
// }

type PPerson = Partial<Person5>
