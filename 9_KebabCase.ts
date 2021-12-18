// 9、KebabCase
// 驼峰命名转横杠命名
// 第一种解法：
type RemoveFirstChar<T> = T extends `-${infer L}` ? L : T

type KebabCase<T extends string, S extends string = ''> = T extends `${infer L}${infer R}`
  ? KebabCase<R, `${S}${L extends Uppercase<L> ? `-${Lowercase<L>}` : L}`>
  : RemoveFirstChar<S>

// 第二种解法：
// type ChangeString<L extends string, S extends string> = `${S}${L extends Uppercase<L>
//   ? `${S extends '' ? '' : '-'}${Lowercase<L>}`
//   : L}`

// type KebabCase<T, S extends string = ''> = T extends `${infer L}${infer R}`
//   ? KebabCase<R, ChangeString<L, S>>
//   : S

export type a11 = KebabCase<'HandleOpenFlag'> // handle-open-flag
export type a21 = KebabCase<'OpenFlag'> // open-flag
export type a22 = KebabCase<'Open'>
