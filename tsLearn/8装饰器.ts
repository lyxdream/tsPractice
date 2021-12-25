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

//3、参数装饰器
namespace e{
  //IOC里用到  //nest.js大量的用到了参数修饰器
  //target 静态成员就是构造函数  非静态成员就是就是构造函数的原型   方法名称，索引位置
  function addAge(target:any,methodName:string,paramIndex:number){
    // console.log(target,methodName,paramIndex)    //Person {} login 1
    target.age = 10;
  }
  class Person{
    age!:number;
    login(userName:string,@addAge password:string){
        console.log(this.age,userName,password,'---')  //10 yx 1234 ---
    }
  }
  let p = new Person()
  p.login('yx','1234')
}

// 4、装饰器的执行顺序

namespace f{
  //类装饰器
  function classDecorator1(){
    return function(target:any){
      console.log('classDecorator1')
    }
  }
  function classDecorator2(){
    return function(target:any){
      console.log('classDecorator2')
    }
  }
   //属性装饰器
  function propertyDecorator(name:string){
    return function(target: any, propertyKey: string){
      console.log('propertyDecorator',propertyKey,name)
    }
  }
  //方法装饰器
  function methodDecorator(){
    return function(target: any, propertyKey: string,descriptor: PropertyDescriptor){
      console.log('methodDecorator',propertyKey)
    }
  }

  //参数装饰器
  function parameterDecorator(){
    return function(arget:any,methodName:string,paramIndex:number){
      console.log('parameterDecorator',methodName,paramIndex)
    }
  }

  @classDecorator1()
  @classDecorator2()
  class Person{
    @propertyDecorator('name')
    name:string='';
    @propertyDecorator('age')
    age:number = 10;
    @methodDecorator()
    hello(@parameterDecorator() p1:string,@parameterDecorator() p2:string){

    }
  }
}

/**
 *执行结果
propertyDecorator name name
propertyDecorator age age
parameterDecorator hello 1
parameterDecorator hello 0
methodDecorator hello
classDecorator2
classDecorator1
 */

/**
 * 执行规律
 * 1.类装饰器最后执行，且后面的累装饰器先执行
 * 2.方法和方法参数中的装饰器，先执行参数装饰器
 * 3.方法和属性装饰器谁在前面，谁在前面先执行谁
 * 
 * 先内后外执行  (先执行类里面的方法和属性，再执行类装饰器)
 * 类比组件 componentDidMount  //先上后下  先内后外
*/


