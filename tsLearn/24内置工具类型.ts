// 具体而言，一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除
// 1、Partial
export {}

interface A {
  a: string
  b: number
  c: boolean
}
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
type PartialA = Partial<A>
let a: PartialA = {
  a: '',
  b: 1,
  c: true
}

// 实现DeepPartial
interface Company {
  id: number
  name: string
}
interface Person {
  id: number
  name: string
  company: Company
}

type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U]
}

type PartialPerson = DeepPartial<Person>

let p: PartialPerson = {
  id: 1,
  name: 'yx',
  company: {}
}

// 2、Required
namespace aa {
  interface Person {
    name: string
    age?: number
  }
  type Required<T> = {
    [P in keyof T]-?: T[P]
  }
  type RequiredPerson = Required<Person>
  let p: RequiredPerson = {
    name: 'yx',
    age: 11
  }
}

// 3.Readonly
namespace b {
  interface Person {
    name: string
    age?: number
  }
  type Readonly<T> = {
    readonly [P in keyof T]: T[P]
  }
  type ReadonlyPerson = Readonly<Person>

  //可选某一项
  type ReadonlyNamePerson = Person & {
    readonly name: string
  }
  let p: ReadonlyPerson = {
    name: 'yx',
    age: 11
  }
  // p.name = '111'
}

// 4、Pick
// Pick 能够帮助我们从传入的属性中摘取某一项返回
namespace c {
  interface Person {
    name: string
    age: number
    gender: number
  }

  let person: Person = {
    name: 'yx',
    age: 22,
    gender: 1
  }
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
  type PickPerson = Pick<Person, 'name' | 'age'>

  // Extract
  type Extract<T, U> = T extends U ? T : never
  // 有条件类型分发
  type R2 = Extract<string | number | boolean, string | number>
  let e: R2 = '1'
}

// 5、Record
// 他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型

namespace d {
  type keyofAany = keyof any // string | number | symbol
  type Record<K extends keyof any, T> = {
    // []任意属性
    // [key: string]: string
    // [key: number]: string
    [P in K]: T
  }
  function mapObject<K extends string | number, T, U>(obj: Record<K, T>, map: (x: T) => U) {
    let result: Record<K, U> = <Record<K, U>>{}
    for (const key in obj) {
      result[key] = map(obj[key])
    }
    return result
  }
  let obj = { count1: 1, count2: 2, 3: 3 }
  let map = (x: number): string => x * 2 + ''
  let newObj = mapObject<string | number, number, string>(obj, map)
}
