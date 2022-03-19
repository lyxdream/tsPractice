// 1.描述对象的形状
interface Speakable {
  name: string
  speak(): void
}
let speakMan: Speakable = {
  name: 'yx',
  speak() {}
}

//2、行为的抽象(同名的接口可以写多个，类型会自动合并)
interface Speakable {
  speak(): void
}
interface Eatable {
  eat(): void
}

// extends用来继承类，implements用来实现一个接口
// 一个类可以实现多个接口
class Person implements Speakable, Eatable {
  name!: string
  speak(): void {
    throw new Error('Method not implemented.')
  }
  eat(): void {
    throw new Error('Method not implemented.')
  }
}

//3、任意属性
interface Person2 {
  readonly id: number
  name: string
  [key: string]: any
}

let p: Person2 = {
  id: 1,
  name: 'yx',
  age: 10,
  home: 'dd'
}

//4、接口的继承

interface Speakable2 {
  speak(): void
}

interface SpeakChinese extends Speakable2 {
  speakChinese(): void
}

class ChineseMan implements SpeakChinese {
  speakChinese(): void {
    throw new Error('Method not implemented.')
  }
  speak(): void {
    throw new Error('Method not implemented.')
  }
}

//5、 readonly
// 用 readonly 定义只读属性可以避免由于多人协作或者项目较为复杂等因素造成对象的值被重写

interface Person3 {
  readonly id: number
}
let p3: Person3 = {
  id: 1
}
//p3.id = 2;


// 6、函数类型接口
//对方法传入的参数和返回值进行约束
interface Discount {
  (price: number): number
}
const discount: Discount = (price: number): number => {
  return price * 0.8
}

//7、可索引接口 （对数组和对象进行约束）
interface User {
  [index: number]: string
}
let user: User = {
  0: '0',
  1: '1'
}
let arr: User = ['1', '2', '3']

// 8、 类接口 对类的约束

interface Speakable5 {
  name: string
  speak(words: string): void
}
class Dog implements Speakable5 {
  name!: string
  speak(words: string) {
    console.log(words)
  }
}
let dog = new Dog()
dog.speak('汪汪汪')

//9、构造函数的类型
// 同时也可以使用interface里特殊的new()关键字来描述类的构造函数类型
namespace c {
  class Animal {
    constructor(public name: string) {}
  }

  interface WithNameClass {
    new (name: string): Animal
  }
  function createAnimal(clazz: WithNameClass, name: string) {
    return new clazz(name)
  }
  let test = createAnimal(Animal, 'yx')
  console.log(test.name)
}

//10.函数
namespace d {
  class Animal {
    constructor(public name: string) {}
  }

  interface WithNameClass {
    new (name: string): any
  }
  let yx: WithNameClass = Animal
}

// 11.函数
namespace f {
  //是个函数
  interface Type1 {
    (name: string): any
  }
  //是个对象，但是属性是个函数
  interface Type2 {
    a: (name: string) => any
  }
  let t1: Type1 = (name: string) => {}
  let t2: Type2 = {
    a: t1
  }
}

// 12.函数
namespace g {
  //是个函数
  interface Type1 {
    (name: string): any
    age: number
  }
  //是个对象，但是属性是个函数
  interface Type2 {
    a: (name: string) => any
  }
  const t: any = (name: string) => {}
  t.age = 10
  let t1: Type1 = t
  let t2: Type2 = {
    a: t1
  }
}

//13.抽象类vs接口

abstract class Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  abstract speak(): void
}
interface Flying {
  fly(): void
}
class Duck extends Animal implements Flying {
  speak() {
    console.log('汪汪汪')
  }
  fly() {
    console.log('我会飞')
  }
}
let duck = new Duck('zhufeng')
duck.speak()
duck.fly()
