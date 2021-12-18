
/*
12、ComponentEmitsType
定义组件的监听事件类型
实现 ComponentEmitsType<Emits> 类型，将
{
  'handle-open': (flag: boolean) => true,
    'preview-item': (data: { item: any, index: number }) => true,
      'close-item': (data: { item: any, index: number }) => true,
}
转化为类型
{
    onHandleOpen?: (flag: boolean) => void,
    onPreviewItem?: (data: { item: any, index: number }) => void,
    onCloseItem?: (data: { item: any, index: number }) => void,
}
*/

/*
1、第一步 转换函数返回值类型为void
实现如下：
type Source = {
  'handle-open': (flag: boolean) => true,
  'preview-item': (data: { item: any, index: number }) => true,
  'close-item': (data: { item: any, index: number }) => true,
}
type ComponentEmitsType<T> = {
  [k in keyof T]?: T[k] extends ((...args: infer A) => any) ? (...args: A) => void : T[k]
}
 type A = ComponentEmitsType<Source>

 2、第二步
把key转换为大驼峰命名并且头部加on
import { CamelCase } from './1'
type Source = {
  'handle-open': (flag: boolean) => true,
  'preview-item': (data: { item: any, index: number }) => true,
  'close-item': (data: { item: any, index: number }) => true,
}
type ComponentEmitsType<T> = {
  [k in keyof T as `on${k extends string ? CamelCase<k> : ''}`]?: T[k] extends ((...args: infer A) => any) ? (...args: A) => void : T[k]
}
type A = ComponentEmitsType<Source>
*/

/*
3、第三步实际运用
最后返回的 Component变量类型为一个合法的React组件类型，并且能够通过`on事件驼峰命名`的方式，监听定义的事件，并且能够自动推导出事件的参数类型
提示，定义组件的props类型方式为 { (props: Partial<Convert<Emits>>): any }
(1)写一个简单的示例
函数的写法：
a:() => any
a:{():any  }
const Component: {
  (props: {
    name?: string,
    age?: number,
    flag?: boolean
  }): any
} = {} as any

console.log(
  <Component
    name="111"
    age={11}
    flag={true}
  />
)
*/

/*
(2) 实现具体的实例：
*/

/*
import { CamelCase } from './10_CamelCase'

const source = {
  'handle-open': (flag: boolean) => true,
  'preview-item': (data: { item: any, index: number }) => true,
  'close-item': (data: { item: any, index: number }) => true,
}
type ComponentEmitsType<T> = {
  [k in keyof T as `on${k extends string ? CamelCase<k> : ''}`]?: T[k] extends ((...args: infer A) => any) ? (...args: A) => void : T[k]
}

function createComponent<Emits extends Record<string, any>>(emits: Emits): { (props: ComponentEmitsType<Emits>): any } {
  return [{ emits }] as any
}

const Component = createComponent(source)

// 使用：

const hander = {
  onHandleOpen: (val: boolean) => {
    console.log(val)
  }
}
console.log(
  <Component
    // onHandleOpen 的类型为 (flag: boolean) => void
    onHandleOpen={hander.onHandleOpen}
    // onPreviewItem 的类型为 (data: { item: any, index: number }) => void
    onCloseItem={
      val => {
        const { item, index } = val;
        const a: number = item
        console.log(a, item.toFixed(2))
        // console.log(item, index)
      }
    }
  // 所有的监听事件属性都是可选属性，可以不传处理函数句柄
  // onCloseItem={val => [{val}]}
  />
)


*/