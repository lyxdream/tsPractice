export {}
/**
 * 通過一些關鍵字 typeof instanceof for in  來縮小範圍
 */
// 1、typeof 类型保护
function double(input: string | number) {
  if (typeof input === 'string') {
    console.log(input)
  } else if (typeof input === 'number') {
    console.log(input)
  }
}

//2、instanceof类型保护
class Animal {}
class Bird extends Animal {}
class Dog extends Animal {}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal)
  } else if (animal instanceof Dog) {
    console.log(animal)
  }
}
//3、null保护
function getFirstLetter(s: string | null) {
  // if (s === null) {   1
  //   return ''
  // }
  // s = s || ''   2
  // return s.charAt(0)
  return s!.charAt(0) //3
}

// 4、链判断运算符
//链式判断运算符处于stage1 ts也不支持
let a = { b: 2 }
let result = a?.b
//a===null?undefind:a.b
console.log(result)

let x = 'b'
// a?.[x]
// a?.b()
// a?.[x]()

// 5.可辨识的联合类型
interface WarningButton {
  class: 'waring'
  text1: '修改'
}
interface DangerButton {
  class: 'danger'
  text1: '删除'
}

type Button = WarningButton | DangerButton

function getButton(button: Button) {
  if (button.class === 'waring') {
    console.log(button)
  }
  if (button.class === 'danger') {
    console.log(button)
  }
}
////////////////////////////////
interface User {
  username: string
}

type Action =
  | {
      type: 'add'
      payLoad: User
    }
  | { type: 'delete'; payLoad: number }

const reducer = (action: Action) => {
  switch (action.type) {
    case 'add':
      action.payLoad.username
      break
    case 'delete':
      let id: number = action.payLoad
      break
  }
}

// 6、 in操作符
interface Bird {
  swing: number
}

interface Dog {
  leg: number
}
function getNumber(x: Bird | Dog) {
  if ('swing' in x) {
    return x.swing
  }
  return x.leg
}

// 7、自定义的类型保护
interface Bird {
  leg: number //2
}

interface Dog {
  leg: number //4
}
//类型谓词 parameterName is type 哪个参数是什么类型
function isBird(x: Bird | Dog): x is Bird {
  // return x.leg === 2
  return (x as Bird).swing === 2
}

function getAanimal(x: Bird | Dog) {
  if (isBird(x)) {
    console.log(x)
  } else {
    console.log(x)
  }
}

// 8、unknown
// TypeScript 3.0 引入了新的unknown 类型，它是 any 类型对应的安全类型
// unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查

// (1)any
// 可以对any进行任何操作还不需要检查类型
let value: any
value = true
value = 1
value = []

// value.foo()
value.length

let value2: unknown
value2 = true
value2 = 1
value2 = []
// value2.foo()

//(2)如果想调用unknown的方法和属性
value2 = 'hello'
//断言
console.log((value2 as string).length)
//typeof
if (typeof value2 == 'string') {
  console.log(value2.length)
}

// (3)联合类型中的unknown 不管联合什么，后面都是unknown

type U1 = unknown | null
type U2 = unknown | undefined
type U3 = unknown | string
type U4 = unknown | number[]

//(4)交叉类型
namespace ad {
  interface A {
    name: string
    c: number
  }
  interface B {
    age: number
    c: number
  }
  type C = A & B
  let c: C = { name: 'yx', age: 10, c: 10 }
  let a: A
  let b: B
  a = c
  b = c
}

type AA = string | number
type BB = string | boolean
type CC = AA & BB //string
//子类型

// (5)never是unknown子类型

type isNever = never extends unknown ? true : false
type keys = keyof unknown

let aa: unknown
let bb: unknown
console.log(aa === bb) //true
console.log(aa !== bb) //false

// (6)映射属性的时候
// keyof unknown 等于never
type getType<T> = {
  [P in keyof T]: number
}
type t = getType<unknown>
