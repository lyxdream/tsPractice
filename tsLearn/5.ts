// 类里面的修饰符


export {}
//public protected private
class Father {
  public name: string //自己 自己的子类 其他类型都可以访问
  protected age!: number //自己 自己的子类可以访问
  private money!: number //自己能访问，子类和其他类型不能访问
  constructor(name: string, age: number, money: number) {
    this.name = name
    this.age = age
    this.money = money
  }
  getName(): string {
    return this.name
  }
}
class Child extends Father {
  constructor(name: string, age: number, money: number) {
    super(name, age, money)
  }
  desc() {
    console.log(this.name, this.age)
  }
}

let child = new Child('yx', 21, 111)
console.log(child.name)
// child.age
// child.money
