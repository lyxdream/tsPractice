// //对方法传入的参数和返回值进行约束
// export {}
// interface Discount {
//   (price: number): number
// }
// const discount: Discount = (price: number): number => {
//   return price * 0.8
// }

// console.log(discount)

// const discount3: (price: number) => number = (price: number): number => {
//   return price * 0.8
// }

// const discount4: (price: number) => number = (price) => {
//   return price * 0.8
// }

// namespace g {
//   //是个函数
//   interface Type1 {
//     (name: string): any
//     age: number
//   }

//   //是个对象，但是属性是个函数
//   interface Type2 {
//     a: (name: string) => any
//   }

//   const t: any = (name: string) => {}
//   t.age = 10

//   let t1: Type1 = t
//   let t2: Type2 = {
//     a: t1
//   }
// }

// namespace d {
//   class Animal {
//     constructor(public name: string) {}
//   }

//   interface WithNameClass<T> {
//     new (name: string): T
//   }
//   function createAnimal<T>(target: WithNameClass<T>, name: string): T {
//     return new target(name)
//   }
//   let test = createAnimal(Animal, 'yx')
//   console.log(test.name)
// }

// interface IVegetables {
//   readonly color:string,
//   size:string
// }
// interface IVegetables{
//   age?:number,
//   taste:'sour'|'sweet'
// }
// const tomato:IVegetables = {
//   color:'red',
//   size:'10',
//   taste:'sour'
// }

// function factory<T>(type: { new (): T }): T {
//   return new type()
// }

// class Person1 {}
// let p1 = factory<Person1>(Person1)
// console.log(p1)

// class Person1 {
//   name!: string
//   age!: number
//   constructor(name: string, age: number) {
//     this.name = name
//     this.age = age
//   }
// }
// const createClass = <T>(
//   type: { new (name: string, age: number): T },
//   name: string,
//   age: number
// ): T => {
//   return new type(name, age)
// }
// const c = createClass<Person1>(Person1, 'yx', 12)
// console.log(c)
// function factory<T>(type: new () => T): T {
//   return new type()
// }

// class Person1 {}
// let p1 = factory<Person1>(Person1)
// console.log(p1)

// interface add {
//   <T>(a: T, b: T): T
// }

// let addFn: add = function addFn<T>(a: T, b: T):T {
//   return a
// }
// addFn<number>(1, 2)
export {}
enum Colors {
  Red,
  Yellow
}

//数字可以赋给枚举
let c: Colors
c = Colors.Red
c = 1

//枚举值可以赋给数字
let n: number
n = 1
n = Colors.Red
console.log(n, '----')
