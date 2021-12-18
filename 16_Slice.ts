// 12、Slice
// 截取元组中的部分元素

type Slice<
  T extends any[],
  Start extends number,
  End extends number = T['length'],
  StartArr extends any[] = [],
  EndArr extends any[] = [],
  Prev extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? StartArr['length'] extends Start
    ? EndArr['length'] extends End
      ? [...Prev, First]
      : Slice<Rest, Start, End, StartArr, [...EndArr, First], [...Prev, First]>
    : Slice<Rest, Start, End, [...StartArr, First], [...EndArr, First], Prev>
  : Prev

// type A1 = Slice<[any, never, 1, '2', true, boolean], 0, 2>
// // [any,never,1]  从第0个位置开始，保留到第2个位置的元素类型
// type A2 = Slice<[any, never, 1, '2', true, boolean], 1, 3>
// // [never,1,'2']   从第1个位置开始，保留到第3个位置的元素类型
// type A3 = Slice<[any, never, 1, '2', true, boolean], 1, 2>
// [never,1]       从第1个位置开始，保留到第2个位置的元素类型
type A4 = Slice<[any, never, 1, '2', true, boolean], 2>
// [1,'2',true,boolean]    从第2个位置开始，保留后面所有元素类型
type A5 = Slice<[any], 2>
// []    从第2个位置开始，保留后面所有元素类型
type A6 = Slice<[], 0>
// []    从第0个位置开始，保留后面所有元素类型
