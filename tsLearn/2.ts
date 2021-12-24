/**
  函数类型
函数的两种声明方式:
通过function关键字来进行声明
通过表达式方式声明
 函数的写法：
  a:() => any
  a:{():any  }
 */
// -----------------------------
function hello(name: string): void {
  console.log('hello', name)
}
hello('yx')
// -----------------------------
type GetName = (firstName: string, lastName: string) => string
let getName: GetName = function (firstName: string, lastName: string): string {
  return firstName + lastName
}
// -----------------------------

function print(name: string, age?: number): void {
  console.log(name, age)
}
print('yx', 11)
// -----------------------------
function ajax(url: string, methods: string = 'Get') {
  console.log(url)
}
ajax('/')
// -----------------------------
function sum(...numbers: number[]) {
  return numbers.reduce((pre, curr) => pre + curr, 0)
}
console.log(sum(1, 2, 3))

/**
  函数的重载
 */
let obj: any = {}
//function attr():void;
/*
如果传的val是一个字符串给obj.name 数字给obj.age
 */
function attr(val: string): void
function attr(val: number): void
function attr(val: any): void {
  if (typeof val === 'string') {
    obj.name = val
  } else {
    obj.age = val
  }
}
attr('yx')
attr(10)
// attr(true)
// -----------------------------
function attr2(val: string | number): void {
  if (typeof val === 'string') {
    obj.name = val
  } else {
    obj.age = val
  }
}
attr2('yx')
attr2(10)
// attr(true)
/*-----------------------------*/
function add(val: string, b: string): void
function add(val: number, b: number): void
function add(a: string | number, b: string | number): void {}
add('a', 'b')
add(1, 2)
// add('a', 1)
