export {}
//父类不能调用子类的方法

class Father {
  static fatherName: string = 'fatherName'
  toString() {
    console.log('Father')
  }

  public name: string //自己 自己的子类 其他类型都可以访问
  protected age!: number //自己 自己的子类可以访问
  private money!: number //自己能访问，子类和其他类型不能访问
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getName(): string {
    return this.name
  }
}
class Child extends Father {
  static childName: string = 'childName'
  toString() {
    super.toString()
    console.log('Child')
  }

  constructor(name: string, age: number) {
    super(name, age)
  }
  desc() {
    console.log(this.name, this.age)
  }
}

//子类可以访问父类静态方法和属性
// Child.fatherName
// Child.childName

let father = new Father('namehahhah', 21)
let child = new Child('yx', 21)
// father.toString() //Father
child.toString() //Child
