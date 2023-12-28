'use strict';
// constructor function
// JS doesnt have regular classes, but we can create objects from a constructor functions.

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  /*
 never create a methods inside of a constructor function becaus if we are creating thousands of instances each one would carry around a copy of that method and other methods we would create which will affect the performance, instead we would use the prototype and prototype inheritance
 */
//   this.calcAge = function () {
//     console.log(2037 - this.birthYear);
//   };
};

const jonas = new Person('jonas', 1991);
console.log(jonas);

// 1. a new empty object {} is created
// 2.function is called, this = {}. the THIS keyword will point to the newely created object that was created in No.1
// 3.{} linked to a prototype
// 4.function automatically return {}

const matilda = new Person('matilda', 2017);
const jack = new Person('jack', 1975);

console.log(matilda);
console.log(jack);
const jay = 'jay';
console.log(jay instanceof Person);
console.log(jonas instanceof Person);
