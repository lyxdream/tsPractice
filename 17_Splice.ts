// 13、Splice
// 删除并且替换部分元素
//Start：开始替换的位置   RemoveLen：删除元素的长度   ReplaceItem：替换的元素  StartArr：元组替换之前部分的元素

/*
 1、先判断是否数组为空
    为空则返回Prev
    如果不为空，判断是否StartArr长度为开始开始删除的索引位置
        如果不是：则递归，StartArr长度加1，当前的元素添加到Prev里面
        如果是：判断删除数组ReplaceArr的长度是否为需要删除的元素个数RemoveLen
            如果是：则添加需要替换的元素到Prev返回
            如果不是：则递归删除，ReplaceArr的长度加1
*/
type Splice<
  T,
  Start,
  RemoveLen,
  ReplaceItem extends any[] = [],
  StartArr extends any[] = [],
  ReplaceArr extends any[] = [],
  Prev extends any[] = []
> = T extends [infer First, ...infer Rest]
  ? StartArr['length'] extends Start
    ? ReplaceArr['length'] extends RemoveLen
      ? [...Prev, ...ReplaceItem, First, ...Rest]
      : Splice<Rest, Start, RemoveLen, ReplaceItem, StartArr, [...ReplaceArr, First], Prev>
    : Splice<
        Rest,
        Start,
        RemoveLen,
        ReplaceItem,
        [...StartArr, First],
        ReplaceArr,
        [...Prev, First]
      >
  : Prev

type A1 = Splice<[string, number, boolean, null, undefined, never], 0, 2>
// [boolean,null,undefined,never]               从第0开始删除，删除2个元素
type A2 = Splice<[string, number, boolean, null, undefined, never], 1, 3>
// [string,undefined,never]                     从第1开始删除，删除3个元素
type A3 = Splice<[string, number, boolean, null, undefined, never], 1, 2, [1, 2, 3]>
// [string,1,2,3,null,undefined,never]          从第1开始删除，删除2个元素，替换为另外三个元素1,2,3
