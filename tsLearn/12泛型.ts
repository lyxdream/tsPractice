// 1.泛型函数

//创建一个长度为length的数组，里面用value填充

namespace a11 {
  function createArray(length: number, value: any): Array<any> {
    let res: any = []
    for (let i = 0; i < length; i++) {
      res[i] = value
    }
    return res
  }
  let result = createArray(3, 'x')
  console.log(result)
}

function createArray<T>(length: number, value: T): Array<T> {
  let res: T[] = []
  for (let i = 0; i < length; i++) {
    res[i] = value
  }
  return res
}
let result = createArray<string>(3, '1')
console.log(result)

// 2.类数组
// "downlevelIteration": true,

// function sum() {
//   let args: IArguments = arguments
//   for (let i = 0; i < args.length; i++) {
//     console.log(args[i])
//   }
// }
// sum(1, 2, 3)

namespace test {
  // let obj1 = {
  //   [Symbol.iterator]: () => {
  //     let i = 0
  //     function next() {
  //       return { value: i++, done: false }
  //     }
  //     return {
  //       next
  //     }
  //   }
  // }
  // function* gen() {
  //   yield 1
  //   yield 2
  // }
  // let it = gen()
  // let { value, done } = it.next()
  // console.log(value, done)
}

//3.泛型类

class MyArray<T> {
  private list: T[] = []
  add(value: T) {
    this.list.push(value)
  }
  getMax(): T {
    return this.list[0]
  }
}

let array = new MyArray<number>()
array.add(1)
array.add(2)
array.add(3)

console.log(array.getMax())

//4.泛型与 new

function factory<T>(type: { new (): T }): T {
  return new type()
}

class Person1 {}
let p1 = factory<Person1>(Person1)
console.log(p1)

// function factory<T>(type: { new (): T }): T {
//   return new type() // This expression is not constructable.
// }

//5.泛型接口

// 1.

interface Calculate {
  <T>(a: T, b: T): T
}

let sum1: Calculate = function <T>(a: T, b: T): T {
  return a
}
sum1<number>(1, 2)

/////////////////////

// 2.
// 实现想加的效果
interface Calculate1<T> {
  (a: T, b: T): T
}
let sum2: Calculate1<number> = function (a: number, b: number): number {
  return a + b
}
sum2(1, 2)

//3.<U> 最后的函数确认类型
interface Calculate3<T> {
  <U>(a: T, b: T): U
}
let sum4: Calculate3<number> = function <U>(a: number, b: number): U {
  return a as any
}
sum4<string>(1, 2)

// 6.多个类型参数
// 泛型可以有多个

function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]]
}

// 7.默认泛型类型
// function createArray3<T = number>(length: number, value: T): Array<T> {
//   let result: T[] = []
//   for (let i = 0; i < length; i++) {
//     result[i] = value
//   }
//   return result
// }
// let result2 = createArray3(3, 'x')
// console.log(result2)

interface T2<T = string> {}
type T22 = T2

// 8. 泛型约束
// function logger<T>(val: T) {
//   console.log(val)
// }

interface lengthWise {
  length: number
}
//非常重要
function logger2<T extends lengthWise>(val: T) {
  console.log(val.length)
}
logger2<string>('222')

//因为obj1上面有length属性
let obj1 = {
  length: 10
}
type Obj = typeof obj1
logger2<Obj>(obj1)

////////////////////////////
// 判断兼容不兼容跟extends没有关系，只看形状  //只看有没有对应的属性
namespace f {
  class GrandFather {}
  class Father extends GrandFather {}
  class Child extends Father {}
  function get<T extends Father>() {}
  get<GrandFather>() //不报错
}

namespace h {
  class GrandFather {
    grandFather: string | undefined
  }
  class Father extends GrandFather {
    father!: string
  }
  class Child extends Father {
    child!: string
  }
  //约束，或者是能赋值给father
  //T 是Father的子类型（T的范围大于Father）
  function get<T extends Father>() {}
  // get<GrandFather>() //报错
  get<Child>() //不报错
}
