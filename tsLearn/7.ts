export {}
class Father {}
class Child extends Father {}

/*
function Father() {}
__extends(Child, Father);
function Child(...args) {
    return Father !== null && Father.apply(this, arguments) || this;
}
return Child
*/

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
  // Child.prototype =
  //   Father === null ? Object.create(Father) : ((__.prototype = Father.prototype), new __())
}


function Father() {}
__extends(Child, Father);
function Child(...args) {
    return Father(...args)
}
return Child

*/
