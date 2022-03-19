// 重点：返回值类型是协变的，而参数类型是逆变的
// 返回值类型可以传子类，参数类型可以传父类
// 参数逆变父类   返回值协变子类   搀你父，返鞋子

/***
 * 参数可以传自己和自己的父类,返回值可以传自己和自己的子类
 *四种情况
 1.参数传子类返回子类
 2.参数是子类返回的是父类
 3.参数是父类,返回的是父类
 4.参数是父类,返回的是子类
  "strictFunctionTypes": true,  參逆父,返协子
   "strictFunctionTypes": false,  // 参数类型是双向协变的
 */
export {}
class Animal {}
class Dog extends Animal {
  public name: string = 'Dog'
}
class BlackDog extends Dog {
  public age: number = 10
}
class WhiteDog extends Dog {
  public home: string = '北京'
}
let animal: Animal
let blackDog: BlackDog
let whiteDog: WhiteDog
type Callback = (dog: Dog) => Dog
function exec(callback: Callback): void {
  callback(whiteDog)
}

type ChildToChild = (blackDog: BlackDog) => BlackDog // 参数类型是双向协变的時候,不會報錯
let childToChild: ChildToChild
//  exec(childToChild)

type ChildToParent = (blackDog: BlackDog) => Animal
let childToParent: ChildToParent
//  exec(childToParent)

type ParentToParent = (blackDog: Animal) => Animal
let parentToParent: ParentToParent
// exec(parentToParent)

type ParentToChild = (blackDog: Animal) => BlackDog
let parentToChild: ParentToChild
// exec(parentToChild) //y

namespace de {
  type Callback = (a: string | number) => string | number
  function exec(callback: Callback): void {}
  type ChildToChild = (a: string) => string // 参数类型是双向协变的時候,不會報錯
  let childToChild: ChildToChild
  //  exec(childToChild)

  type ChildToParent = (a: string) => string | number | boolean
  let childToParent: ChildToParent
  //  exec(childToParent)

  type ParentToParent = (a: string | number | boolean) => string | number | boolean
  let parentToParent: ParentToParent
  // exec(parentToParent)

  type ParentToChild = (a: string | number | boolean) => string
  let parentToChild: ParentToChild
  // exec(parentToChild) //y
}
