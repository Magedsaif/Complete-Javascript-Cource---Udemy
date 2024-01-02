'use strict';
// constructor function
// JS doesnt have regular classes, but we can create objects from a constructor functions.

// const Person = function (firstName, birthYear) {
//   //Instance properties
//   this.firstName = firstName;
//   this.birthYear = birthYear;

//  never create a methods inside of a constructor function becaus if we are creating thousands of instances each one would carry around a copy of that method and other methods we would create which will affect the performance, instead we would use the prototype and prototype inheritance

//
//   //   this.calcAge = function () {
//   //     console.log(2037 - this.birthYear);
//   //   };
// };

/* const jonas = new Person('jonas', 1991);
console.log(jonas);

// 1. a new empty object {} is created
// 2.function is called, this = {}. the THIS keyword will point to the newely created object that was created in No.1
// 3.{} linked to a prototype, the new object is linked (__proto__ property) to the constructor function's prototype property.
// 4.function automatically return {}, the new object is returned from the constructor function call

const matilda = new Person('matilda', 2017);
const jack = new Person('jack', 1975);

console.log(matilda);
console.log(jack);
const jay = 'jay';
console.log(jay instanceof Person);
console.log(jonas instanceof Person); */

///////////////////////////////////////////////////////////////////////////
// Prototypes
// protoype property of the person constructor function, so all the objects that are created  through this constructor  function will inherit, so they will get access to all the methods and properties on this prototype

/* // inheritance in constructor functions
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// THIS KEYWORD IS SET TO THE OBJECT THAT IS CALLING THE METHOD.
// prototypal inheritance and protoype chain
jonas.calcAge(); // 46
matilda.calcAge();
jack.calcAge();
console.log(jonas.__proto__); // return the prototype of jonas
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(Person)); //false

Person.prototype.species = 'homo sepians';
console.log(jonas, matilda);

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false because that is not over the jonas object but because it's prototype of Person

// the prototype property of OBJECT
// this is the reason why we could use the hasOwnProperty because its a method in the prototype of the object so we got access to it through the prototypal inheritance in the prototype chain
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
// the prototype of the prototype is NULL becaus the object.protoype is the top of the prototype chain
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// prototype of array

const arr = [3, 6, 5, 9, 7, 3, 7, 7, 3]; // so [] === new Array
// since all the objects in JS has a prototype
//the prototype of the array has all the metods of the array so each array will inherit those method from its prototype
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
// object.prototype
console.log(arr.__proto__.__proto__);
console.log(arr);

// adding a new method to the prototype property of the array constructor, so all arrays would inherit method
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1); */

///////////////////////////////////////
// Coding Challenge #1

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(this.speed += 10);
};

Car.prototype.brake = function () {
  console.log(this.speed -= 5);
}

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

BMW.accelerate();
BMW.accelerate();
BMW.accelerate();
Mercedes.accelerate();
Mercedes.accelerate();
BMW.brake();
 */
//////////////////////////////////////////////////////////////////////
// ES6 Classes
//--------------------------------------------------------------------
//two steps
//class expression

// const PersonCl = class {}

//class declaration

/* class PersonCl {
  constructor(fullname, birthYear) {
    this.fullname = fullname;
    this.birthYear = birthYear;
  }
  // instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  // getters

  get age() {
    return 2037 - this.birthYear;
  }
  // each time we set the fullname in line 139 this setter method is going to  executed
  // set a property tht already exists
  set fullanme(name) {
    console.log(name);
    if (name.includes(' ')) this._fullanme = name;
    else alert(`${name} is not a full name!`);
  }
  get fullanme() {
    return this._fullanme;
  }

  // static methods
  static hey() {
    console.log(`hey there`);
  }
}
// all the methods we write on the class outside the constructor will be on the prototype of the class, not on the object it self

const jessica = new PersonCl('jessica davis', 1996);

console.log(jessica);

jessica.calcAge();

// using getters

console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// the same as adding it on the class it self
PersonCl.prototype.greet = function () {
  console.log(`hey ${this.firstName}`);
};

jessica.greet();

// Important methods
// 1.classes are not hoisted, not like function decleration, which we can use before declaring
// 2. Class are first class citizens, so we can pass them to into function as well as returning them
// 3.classes are executed in strict mode

const walter = new PersonCl('Walter white', '1965');

/////////////////////////////////////////////////////////////////////
// Setters and Getters
//------------------------------------------------------------------
// basically a functions that can get and set a value

// setters and getters for any object in JS
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  // anys set need one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest); // we write it as a property, not calling it

console.log(account.movements);

account.latest = 50; // thats a property not a method so we can set it by using the equal operator

console.log(account.movements);

// Classes as will have setters and getters
// see above

// Setters And Getters are used to validation
//////////////////////////////////////////////////////////////////////////////////////
// Static Methods
//------------------------------------------------------------------------------------
// to add a static method
Person.hey = function () {
  console.log(`Hey there`);
  console.log(this); // the person whos is calling the function
};

Person.hey();
// this is not inherited necause its not on the protoype of the jonas object
// jonas.hey()

PersonCl.hey();

///////////////////////////////////////////////////////////////////////////////////
// Object.create
//--------------------------------------------------------------------------------
// third way to implement prototypal inheritance

// thats the prototype of the object we are going to create and in here thats all the methods we want the person pbjects to inherit
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
// create a Person object with the above object as the prototype
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);

sarah.init('sarah', 1979);
sarah.calcAge(); */
///////////////////////////////////////////////////////////////

// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// Old way

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   console.log(this.speed += 10);
// };

// Car.prototype.brake = function () {
//   console.log(this.speed -= 5);
// }

// const BMW = new Car('BMW', 120);
// const Mercedes = new Car('Mercedes', 95);

// BMW.accelerate();
// BMW.accelerate();
// BMW.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();
// BMW.brake();

// ES6 Way
/* class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  // instance methods
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  // getter
  get speedUS() {
    return this.speed / 1.6;
  }

  // setter

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 160);

console.log(ford);

ford.accelerate();
ford.brake();
// transformed a method to a property
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
 */
//////////////////////////////////////////////////////////////////////////////////////
// all the above was just trying to use prototypal inheritance using
// 1. Constructor functions
// 2. ES6 Classes
// 3.Object.create()
// Now we will implement the inheritance between classes.
// first using constructor functions
//------------------------------------------------------------------------------------

// Inheritance Between "Classes": Constructor Functions

/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// now we will build a constructor function for the student, the student is gonna be the child class from the parent class which is the Person Class

const Student = function (firsName, birthYear, cource) {
  // these two lines of code is repeatative, and if the implementation of the parent is changed so it will not reflect on the child (student) so we will remove them.
  // this.firsName = firsName;
  // this.birthYear = birthYear;
  Person.call(this, firsName, birthYear);
  this.cource = cource;
};

//Linking the prototypes
//creating the connection between student and person, so Student.prototype object is now an object that injerits from Person.prototype
Student.prototype = Object.create(Person.prototype);
// we should add the above line before adding any method because object.create returns an empty object

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firsName}, and i study ${this.cource}`);
};
//creating a new student

const mike = new Student('Mike', 2020, 'Computer Sc ience');

mike.introduce();
mike.calcAge();

// this will return the prototype of the parent class
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person); // thats true because of the linking part in line 380

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
 */
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/* // First challenge

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};

Car.prototype.brake = function () {
  this.speed -= 5
  console.log((`Tesla going at ${this.speed} km/h`));
};

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

//Linking the prototypes
EV.prototype = Object.create(Car.prototype);

// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 0.01 * this.charge;
  console.log(`Tesla going at ${this.speed} km/h, with a charge of ${this.charge}`);
};

// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

const Tesla = new EV('Tesla', 120, 23);


Tesla.accelerate();
Tesla.brake();
Tesla.chargeBattery(90);
Tesla.accelerate(); */


/////////////////////////////////////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes.
//-------------------------------------------------------------------

class PersonCl {
  constructor(fullname, birthYear) {
    this.fullname = fullname;
    this.birthYear = birthYear;
  }
  // instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  // getters

  get age() {
    return 2037 - this.birthYear;
  }
  // each time we set the fullname in line 139 this setter method is going to  executed
  // set a property tht already exists
  set fullname(name) {
  console.log(name);
  if (name.includes(' ')) this._fullname = name;
    else alert(`${name} is not a full name!`);
  }
  get fullname() {
    return this._fullname;
  }

  // static methods
  static hey() {
    console.log(`hey there`);
  }
}

// the extend keyword will link the prototypes behind the scenes
class StudentCl extends PersonCl {
  constructor(fullname, birthYear, cource) {
    // we here dont need to use call function like we did before in the constructor function
    // we call Super function which is the constructor function of the Parent class.

    // so here we pass the parameters of the parent constructor
    // always needs to happen first because it is responsible for creating the this keyword in the subclass(child class)
    super(fullname, birthYear)
    this.cource = cource;
  }
  introduce(){
    console.log(`my name is ${this._fullname} and i study ${this.cource}`);
  }
  //overwritting the calcage in the parent class because it appears first in the prototype chain (shadowing the one in parent class)
  calcAge(){
    console.log(`i'm ${2037 - this.birthYear} old, but i feel like i'm ${2037 - this.birthYear + 10}`);
  }
}

const martha = new StudentCl('Marthaa jonas', 2012, 'CS');

// we could hash all of the constructor and the studentCL will just inherit the properties of the parent class only
// const martha = new StudentCl('Marthaa jonas', 2012);

martha.introduce();
martha.calcAge();