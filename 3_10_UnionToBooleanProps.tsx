// 10、有且只有一个属性
// 实现一个叫做 UnionToBooleanProps 的泛型，使得以下需求成立

// type OneMessageTypes =
//   | { info: true; success?: never; warning?: never; error?: never }
//   | { info?: never; success: true; warning?: never; error?: never }
//   | { info?: never; success?: never; warning: true; error?: never }
//   | { info?: never; success?: never; warning?: never; error: true }

type UnionToBooleanProps<T extends string, K extends string = T> = K extends T
  ? { [k in K]: boolean } & { [k in Exclude<T, K>]?: void }
  : never

//{ [k in Exclude<TT, T>]?: T } 这里的T也是只有一项
//{ [k in T]: T; }  这里的T就是k ,因为T只有一项


type MessageStringType = 'info' | 'success' | 'warning' | 'error'

type OneMessageTypes = UnionToBooleanProps<MessageStringType>
type Props = OneMessageTypes & { id: string }
function Component(props: Props) {
  return <></>
}

const a = <Component id="abc" info /> //correct
const b = <Component id="abc" success /> //correct
// const c = <Component id="abc" /> //wrong
// const d = <Component id="abc" info success /> //wrong

// // 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；

//第二种解法
// type UnionToBooleanProps<T extends string, TT extends string = T> =
//   T extends any ?
//   { [k in T]: boolean; } & { [k in Exclude<TT, T>]?: void }
//   : never