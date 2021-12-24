// 装饰器
export {}

// 1、类装饰器

/*------------------装饰类------------------*/

namespace a {
  function addNameEat(constructor: Function) {
    constructor.prototype.name = 'yx'
    constructor.prototype.eat = function () {
      console.log('eat')
    }
  }
  @addNameEat
  class Person {
    name!: string
    eat!: Function
    constructor() {}
  }
  let p: Person = new Person()
  console.log(p.name) //yx
  p.eat() //eat
}

/*------------------装饰器工厂------------------*/

namespace b {
  function addNameEatFactory(name: string) {
    return function addNameEat(constructor: Function) {
      constructor.prototype.name = name
      constructor.prototype.eat = function () {
        console.log('eat  ' + name)
      }
    }
  }

  @addNameEatFactory('apple')
  class Person {
    name!: string
    eat!: Function
    constructor() {}
  }
  let p: Person = new Person()
  console.log(p.name) //apple
  p.eat() //eat  apple
}

/*------------------替换类------------------*/
// 还可以替换类,不过替换的类要与原类结构相同(可以多，但是不可以少类型)
namespace c {
  function replaceClass(constructor: Function) {
    return class {
      name!: string
      eat!: Function
      age!: number
      constructor() {}
    }
  }

  @replaceClass
  class Person {
    name!: string
    eat!: Function
    constructor() {}
  }
  let p: Person = new Person()
  // console.log(p.name) //apple
  // p.eat() //eat  apple
}

// 2、属性装饰器

//装饰属性、装饰方法

namespace d {
  /**
   * @param target  如果装饰的是实例属性的话，target是构造函数的原型
   * @param propertyKey 属性名
   */

  //  function toUpperCase(target:any,key:string){
  //   let value = target[key];
  //   Object.defineProperty(target,key,{
  //       get(){
  //           return value.toUpperCase();
  //       },
  //       set(newValue){
  //           value = newValue
  //       }
  //    })
  //  }

  function upperCase(target: any, propertyKey: string) {
    let value = target[propertyKey]
    const getter = () => value
    const setter = (newVal: string) => {
      value = newVal.toUpperCase()
    }
    if (delete target[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      })
    }
  }

  // 如果装饰的是静态属性的话，target是构造函数本身
  function staticPropertyDecorator(target: any, propertyKey: string) {
    console.log(target, '--staticPropertyDecorator-')
    console.log(propertyKey, '-staticPropertyDecorator--')
  }

  //方法描述
  function noEnumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target, '---noEnumerable')
    console.log(propertyKey, '--noEnumerable')
    descriptor.enumerable = false
  }

  //方法
  function toNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let oldMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      args = args.map((item) => parseFloat(item))
      return oldMethod.apply(this, args)
    }
  }

  class Person {
    @upperCase
    name: string = 'yx' //实例属性
    @staticPropertyDecorator
    public static age: number = 10 //静态属性
    @noEnumerable
    getName() {
      //实例方法
      console.log(this.name, '-0------')
    }
    @toNumber
    sum(...args: any[]) {
      //实例方法
      return args.reduce((accu: number, item: number) => accu + item, 0)
    }
  }
  let p = new Person()
  console.log(p)
  console.log(p.name) //  YX
  console.log(p.sum('1', '2', '3'))
  p.name = 'jiagou'
  p.getName() //JIAGOU
}

//3、方法装饰器
