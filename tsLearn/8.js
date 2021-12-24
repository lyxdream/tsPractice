"use strict";
// 装饰器
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
// function addNameEat(constructor: Function) {
//   constructor.prototype.name = 'yx'
//   constructor.prototype.eat = function () {}
// }
// @addNameEat
// class Person {
//   name!: string
//   eat!: Function
//   constructor() {}
// }
// let p: Person = new Person()
// console.log(p.name)
// console.log(p.eat())
//当装饰器作为修饰类的时候，会把构造器传递进去
function addNameEat(constructor) {
    constructor.prototype.name = 'zhufeng';
    constructor.prototype.eat = function () {
        console.log('eat');
    };
}
var Person = /** @class */ (function () {
    function Person() {
    }
    Person = __decorate([
        addNameEat
    ], Person);
    return Person;
}());
var p = new Person();
console.log(p.name);
p.eat();
