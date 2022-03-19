export {}
//1、从赋的值中推断出来 类型从右向左流动
let foo = 1
let bar = 'yx'

// 2、通过return 关键字推断返回值类型
//底部流出
function add(a: number, b: number) {
  return a + b
}
let c = add(1, 2)

//3、从左向右流动
type Sum = (a: number, b: number) => number
let sum: Sum = (a, b) => {
  return a + b
}

// 4、结构化
// 推断规则也适用于结构化的存在(对象字面量)
let person = {
  name: 'yx',
  age: 11
}
// let name = person.name
// let age = person.age
// age = '11'

// 5、解构
let { name, age } = person
let numbers = [1, 2, 3]
let c2 = numbers[0]
// numbers[0] = 'hello'; // Error：不能把 'string' 类型赋值给 'number' 类型

// 6\DefaultProps

interface DefaultProps {
  name?: string
  age?: number
}
let defaultProps: DefaultProps = {
  name: 'zhufeng',
  age: 10
}

let props = {
  ...defaultProps,
  home: '北京'
}
type Props = typeof props

// 7\小心使用返回值
// 数字+any返回any

// 尽管 TypeScript 一般情况下能推断函数的返回值，但是它可能并不是你想要的
function addOne(a: any) {
  return a + 1
}
function sum1(a: number, b: number) {
  return a + addOne(b)
}

let k = sum1(1, 2)
