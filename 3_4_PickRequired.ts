// 4、PickRequired
// 保留一个对象中的必须属性
import { RequiredKeys } from './3_3_RequiredKeys'
type PickRequired<T> = Pick<T, RequiredKeys<T>>

type a1 = PickRequired<{ foo: number | undefined; bar?: string; flag: boolean }> // {foo:number|undefined,flag:boolean}
type a2 = PickRequired<{ foo: number; bar?: string }> // {foo:number}
type a3 = PickRequired<{ foo: number; flag: boolean }> // {foo:number,flag:boolean}
type a4 = PickRequired<{ foo?: number; flag?: boolean }> // {}
type a5 = PickRequired<{}> // {}
