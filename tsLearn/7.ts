export {}
class Father {}
class Child extends Father {}

// 编译之后的简化版
/*
var extendStatics = function (Child, Father) {
  extendStatics = function (Child, Father) {
    for (var p in Father) {
      Child[p] = Father[p]
    }
  }
  return extendStatics(d, b)
}

var __extends = function (Child, Father) {
  extendStatics(Child, Father) //把father身上的静态属性都拷贝到Child身上
  function temp() {
    this.constructor = Child
  }
  //原型继承
  let temp = new temp()
  temp.prototype = Father.prototype
  Child.prototype = temp
  
  可以替换为:
   Child.prototype = Object.create(Father.prototype)
}
function Father() {}
__extends(Child, Father)
function Child(...args) {
  return Father(...args)
}
return Child
*/

// create方法的实现
// function create(prototype) {
//   let temp = new temp()
//   temp.prototype = prototype
//   return temp
// }
