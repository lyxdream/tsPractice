export {}
/**
 * 当我们写一个类的时候会得到两个类型
 * 1.构造函数类型的函数类型
 * 2.类的实例类型
 */

namespace a {
  class Component {
    static myName: string = '静态名称属性'
    myName: string = '实例名称属性'
  }
  let com = Component
  //Component 类名本身表示的是实例的类型
  //ts 一个类型 一个值
  //冒号后面的是类型  等号后面的是值
  let c: Component = new Component()
  let f: typeof Component = com
  console.log(c)
}
namespace b {
  function Component(this: any) {
    this.myName = '实例名称属性'
  }
  Component.myName = '静态名称属性'
  let com = Component
  let f: typeof Component = com
  console.log(f)
}
