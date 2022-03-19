type Func<T extends any[], R> = (...a: T) => R

export default function compose(): <R>(a: R) => R
// console.log(compose()('yx'))
// function add1(str) {
//   return str + '1'
// }
// function add2(str) {
//   return str + '2'
// }

// console.log(compose<string, any[], string>(add1, add2)('yx'))

export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
  f1: (a: A) => R, //A= yx1 R=yx21
  f2: Func<T, A> //T = yx  A=yx2
): Func<T, R> //T = yx  R=yx21

/* three functions */
export default function compose<A, B, T extends any[], R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
  f1: (c: C) => R,
  f2: (b: B) => C,
  f3: (a: A) => B,
  f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(f1: (a: any) => R, ...funcs: Function[]): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  )
}
