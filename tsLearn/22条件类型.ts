export {}

// 1\定义条件类型
interface Fish {
  name1: string
}

interface Water {
  name2: string
}

interface Bird {
  name3: string
}

interface Sky {
  name4: string
}

type Condition<T> = T extends Fish ? Water : Sky
let con: Condition<Fish> = {
  name2: '水'
}

// 2\条件类型的分发
let con1: Condition<Fish | Bird> = { name2: '' }
let con2: Condition<Fish | Bird> = { name4: '' }

// (2)条件类型有一个特性,就是「分布式有条件类型」,但是分布式有条件类型是有前提的,条件类型里待检查的类型必须是naked type parameter
//none naked type  ([T])
//type Condition<T> = [T] extends [Fish] ? Water : Sky;

// (3)找出T中不包含U的部分
type Diff<T, U> = T extends U ? never : T
type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>

type Filter<T, U> = T extends U ? T : never
type R3 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'b' | 'c'>

