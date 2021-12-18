// 7 SplitString
// 将字符串字面量类型按照指定字符，分割为元组。无法分割则返回原字符串字面量
// 强调类型   类型约束T extends string
export type SplitString<
  T,
  S extends string,
  A extends any[] = []
> = T extends `${infer L}${S}${infer R}` ? SplitString<R, S, [...A, L]> : [...A, T]

export type A1 = SplitString<'handle-open-flag', '-'> // ["handle", "open", "flag"]
export type A2 = SplitString<'open-flag', '-'> // ["open", "flag"]
export type A3 = SplitString<'handle.open.flag', '.'> // ["handle", "open", "flag"]
export type A4 = SplitString<'open.flag', '.'> // ["open", "flag"]
export type A5 = SplitString<'open.flag', '-'> // ["open.flag"]


