// 5、Merge
// 合并两个对象类型T以及K，如果属性重复，则以K中属性类型为准；

//先找出K中不存在的属性，即T独有的属性
//然后&k中的所有属性

type Merge<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K

type obj1 = {
  el: string
  age: number
  id: number
}

type obj2 = {
  el: HTMLElement
  flag: boolean
  id: string
}

type obj3 = Merge<obj1, obj2> // {el:HtmlElement,age:number,flag:boolean}

// const a = { ...({} as obj3) }
// console.log(a.el.scrollTop, a.age.toFixed(0), a.flag.valueOf())
// console.log(a.el.charAt(0))     // error
