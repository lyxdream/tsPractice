export {}

//抽象类 和抽象方法

// 抽象描述一种抽象的概念，无法被实例化，只能被继承
// 无法创建抽象类的实例
// 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现

abstract class Animal {
  name!: string
  abstract speak(): void
}

class Cat extends Animal {
  speak(): void {
    console.log('miaomiao')
  }
}

class Dog extends Animal {
  speak(): void {
    console.log('wanwan')
  }
}
// let animal = new Animal();//Cannot create an instance of an abstract class
// animal.speak();
let cat = new Cat()
cat.speak() //miaomiao

/**
 * 重写（override） 子类重写继承自父类中的方法
 * 重载（overload）  函数的重载
 */

//函数重载
function double(val:string):any
function double(val:number):any
function double(val: any) {
  if (typeof val === 'number') {
    return val
  } else if (typeof val === 'string') {
    return val + val
  }
}

double(2)
double('2')
// double(true)



/**
 * 继承和多态
 * 多态：同一个方法，不同的子类有不同的实现（Cat，Dog）
 * 继承：子类继承父类
 */

