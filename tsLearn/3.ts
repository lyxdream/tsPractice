// 类的定义
export {}

/*
"strictPropertyInitialization": true / 启用类属性初始化的严格检查/
name!:string
*/

/*
class Person {
  name!: string
  getName(): void {
    console.log(this.name)
  }
}
let p1 = new Person()
p1.name = 'zhufeng'
p1.getName()
*/

/*
定义存取器
*/

//  var User = /** @class */ (function () {
//   function User(myName) {
//     this.myName = myName;
// }
// Object.defineProperty(User.prototype, "name", {
//     get: function () {
//         return this.myName;
//     },
//     set: function (val) {
//         this.myName = val;
//     },
//     enumerable: false, //for in  可遍历的
//     configurable: true //可删除的 delete
// });
// return User;
// }());
// var user = new User('yx');
// user.name = 'li';
// console.log(user.name);

class User {
  myName!: string
  constructor(myName: string) {
    this.myName = myName
  }
  get name() {
    return this.myName
  }
  set name(val) {
    this.myName = val
  }
}

let user = new User('yx')
user.name = 'li'
console.log(user.name)
/*
---------------------------------------------------
readonly
*/

class Animal {
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
  changeName(name: string) {
    // this.name = name
  }
}


