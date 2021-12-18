// 10.CamelCase
// 横杠命名转化为驼峰命名
export type CamelCase<
  T extends string,
  K extends string = '-',
  S extends string = ''
> = T extends `${infer L}${K}${infer R}`
  ? CamelCase<R, K, `${S}${Capitalize<L>}`>
  : `${S}${Capitalize<T>}`
export type a1 = CamelCase<'handle-open-flag'> // HandleOpenFlag
export type a2 = CamelCase<'open-flag'> // OpenFlag
export type a3 = CamelCase<'open'>

// 第二种解法：
// type CamelCase<
//   T extends string,
//   Prev extends string = ''
// > = T extends `${infer L}-${infer R1}${infer R2}`
//   ? CamelCase<R2, `${Prev}${L}${Uppercase<R1>}`>
//   : Capitalize<`${Prev}${T}`>
