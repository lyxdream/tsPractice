import compose from ".";
/* zero functions */
console.log(compose()<string>("zhufeng"));
/* one functions */
interface F{
    (a:string):string
}
let f: F = (a:string):string=>a+'f';
console.log(compose<F>(f)("zhufeng"));
/* two functions */
type A = string;
type R = string;
type T = string[];

let f1 = (a: A): R => a + "f1";
let f2 = (...a: T): A => a + "f2";
console.log(compose<A,T,R>(f1,f2)("zhufeng"));