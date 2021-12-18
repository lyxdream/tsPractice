//8 LengthOfString
// 计算字符串字面量类型的长度
export type LengthOfString<T, A extends any[] = []> = T extends `${infer L}${infer R}`
  ? LengthOfString<R, [...A, L]>
  : A['length']

export type A = LengthOfString<'BFE.dev'> // 7
export type B = LengthOfString<''> // 0
export type C = LengthOfString<number> // 0
