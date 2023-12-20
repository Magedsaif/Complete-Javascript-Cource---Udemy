// 'use strict';

// // Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

//   const openingHours = {
//     thu: {
//       open: 12,
//       close: 22,
//     },
//     fri: {
//       open: 11,
//       close: 23,
//     },
//     sat: {
//       open: 0, // Open 24 hours
//       close: 24,
//     },
//   };

// // Data needed for first part of the section
// const restaurant = {
//   name: 'Classico Italiano',
//   location: 'Via Angelo Tavanti 23, Firenze, Italy',
//   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
//   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
//   mainMenu: ['Pizza', 'Pasta', 'Risotto'],


//   // ES6 enhanced object literals
//   openingHours,

//   // method to retrieve
//   order(starterIndex, mainIndex) {
//     return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
//   },



//   orderDelivery(
//     {
//     starterIndex = 1,
//     mainIndex = 0,
//     time = '20:00',
//     address,
//     }) {
//     console.log(`order received! ${this.starterMenu[starterIndex]}
//     and ${this.mainMenu[mainIndex]}will be deliverd to ${address} at ${time}`);
//   },

//   orderPasta: function (ing1, ing2, ing3) {
//     console.log(`here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
//   },

//   orderPizza(mainIngredient, ...otherIngredients) {
//     console.log(mainIngredient);
//     console.log(otherIngredients);
//   }
// };

// console.log('a+very+nice+string'.split('+'));
// console.log('maged saif'.split(' '));

// const [firstname, lastname] = 'maged saif'.split(' ');

// const newName = ['Mr.', firstname, lastname.toUpperCase()].join(' ');

// console.log(newName);

// const capitalizeName = function(name) {
//   const namesUpper = [];
//   const names = name.split(' ');
//   for(const n of names) {
//     namesUpper.push(n[0].toUpperCase() + n.slice(1));
//     //another way
//     // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesUpper.join(' '));
// }

// capitalizeName('maged medhat saif');


// // Padding

// const message = 'Go to gate 23!';
// console.log(message.padStart(25, '+'));
// console.log('jonas'.padStart(25, '+'));


// const maskCreditCard = function(number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   return last.padStart(str.length, '*');
// }
// console.log(maskCreditCard(4354343584523));
// console.log(maskCreditCard('33546543215'));
// console.log(maskCreditCard('33454'));

// // Repeat

// const message2 = 'Bad weather... All departuers Delayed... ';
// console.log(message2.repeat(5));

// const planesInLine = function(n) {
//   console.log(`There are ${n} planes in line. ${'✈️'.repeat(n)}`);
// }

// planesInLine(50);




///////////////////////////////////////
// Coding Challenge #4

/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/


// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));


// const button = document.querySelector('button');

// button.addEventListener('click', function() {
//   const text = document.querySelector('textarea').value;
//   const namesCamel = [];
//   const strSplitted = text.split('_');
//   for (const n of strSplitted) {
//     namesCamel.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(namesCamel.join(' '));
// })

















// const airline = 'TAP Air Portugal';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // fix the capitalization in a passenger name
// const passenger = 'jOnAs'; //Jonas

// const passengerLower = passenger.toLowerCase();

// const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);

// console.log(passengerCorrect);


// // Comparing Email

// const email = 'hello@jonas.io';
// const loginEmail = '    Hello@Jonas.Io \n';

// // const lowerEmail = loginEmail.toLowerCase();

// // const trimmedEmail = lowerEmail.trim();

// // console.log(trimmedEmail);

// const normEmail = loginEmail.toLowerCase().trim();

// console.log(normEmail);

// console.log(email === normEmail);


// //replacing

// const priceGB = '288,97^';
// const priceUS = priceGB.replace('^', '$').replace(',', '.')
// console.log(priceUS);


// const announcement = 'All passengers come to bording door 23!, bording door 23! '

// console.log(announcement);
// console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate'));

// //Booleans

// const plane = 'Airbus A320neo';
// console.log(plane.includes('A320'));
// console.log(plane.includes('Boeing'));
// console.log(plane.startsWith('Air'));

// if(plane.startsWith('Airbus') && plane.endsWith('neo')) {
//   console.log('part of the New Airbus family');
// }


// //Excersise

// const checkBaggage = function(items) {
//   const baggage = items.toLowerCase();
//   if(baggage.includes('knife') || baggage.includes('gun')){
//     console.log('You are NOT alowed on board');
//   } else {
//     console.log('Welcome aboard!');
//   }
// }



// checkBaggage('I have laptop, some Food and a pocket Knife');
// checkBaggage('socks and camera');
// checkBaggage('got some snacks and gun for protection')




// ///////////////////////////////////////
// // Coding Challenge #2

// /*
// Let's continue with our football betting app!

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// GOOD LUCK 😀
// */

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1
// let goalNumber = 1;
// for (const player of game.scored) {
//   console.log(`Goal${goalNumber} :${player}`);
//   goalNumber++;
// }
// ///
// console.log('------');

//  // 2
// let sum = 0;
// let length = Object.values(game.odds).length;
// for (const odd of Object.values(game.odds)) {
//   sum = odd + sum;
// };

// let average = sum / length;
// console.log(average);
// ///
// console.log('------');
// // 3

// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamString = team === 'x' ? 'draw' : `victory ${game[team]}`;
//   console.log(`Odd of ${teamString} ${odd}`);
// }






























/////////////////////////////////////////////////////////

// looping objects (object keys, values and entries)

// Property Names (keys)

// const properties = Object.keys(openingHours);

// console.log(properties);


// let openStr = `we are open on ${properties.length} days`

// for (const day of properties) {
//   openStr+= `${day}, `;
// }

// console.log(openStr);


// // Property Values

// const values = Object.values(openingHours);

// console.log(values);


// // Entire objtct ===> entries = name + values

// const entries = Object.entries(openingHours);
// // console.log(entries);


// for (const [key, {open, close}] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// ///////////////////////////////////////////////////////////////
// // optional chaining

// if ( restaurant.openingHours && restaurant.openingHours.mon) console.log
// (restaurant.openingHours.mon.open);

// // with optional chaining
// // to check if object is exist
// console.log(restaurant.openingHours?.mon?.open);


// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   console.log(day);
//   const open = restaurant.openingHours[day]?.open ?? 'closed'
//   console.log(`on ${day}, we open at ${open}`);
// }


// // Methods
// // to check for a method if it does exist
// console.log(restaurant.order?.(0,1)??'Method no exist');



// // on arrays to check if an array is empty
// const users = [
//   {
//     name: 'jonas',
//     email: 'hello@gmail.com'
//   }
// ];
// const usersEmptyList = [];

// console.log(users[0]?.name ?? 'users array is empty');

// console.log(usersEmptyList[0]?.name ?? 'users array is empty');

// // that saves me alot of time to check by if and else statement like that
// if (users.length > 0) console.log(users[0].name);
// else console.log('user array is empty');




// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // FOR OF looping
// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
//
// console.log([...menu.entries()]);
    // restaurant.numGuests = 0;

    // const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;


// logical operator, can use any data typem return Any data type,
// short circuiting

// console.log(3 || 'jonas');
// console.log('' || 'jonas');
// console.log(true || 0);
// console.log(undefined || null);

// restaurant.numGuests = 0;

// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;

// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;

// console.log(guests2);

// console.log('-----AND-----');

// console.log(0 && 'Jonas');
// console.log(7 && 'jonas');

// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mush', 'spin');
// }

// restaurant.orderPizza && restaurant.orderPizza('mush', 'spin')








// // bad way
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// // spread operator
// // good way

// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr);
// console.log(1,2,7,8,9);

// // creating new array insead of manuiplating restaurant.mainManu
// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);


// // copy array

// const mainManuCopy = [...restaurant.mainMenu];

// // join two or more arrays

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu]
// console.log(menu);


// // iterables are arrays, strings, maps, sets, BUT NOT objects

// const str = 'jonas';
// const letters = [...str + ' ' + 'S.']
// console.log(letters);


//destructing
// // spread because of the RIGHT side

// const arr = [1,2, ...[3, 4]];

// console.log(arr);

// // REST because of the lift side

// const [a, b, ...others] = [1, 2, 3, 4, 5];

// console.log(a, b, others);

// const [pizza, ,risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu]

// console.log(pizza, risotto, otherFood);


// //objects

// const {sat, ...weekdays} = restaurant.openingHours;
// console.log(weekdays);


// //functions

// const add = function(...numbers) {
//   let sum = 0;
//   for(let i = 0; i < numbers.length; i++) sum+=numbers[i]
//   console.log(sum);
// }

// add(2,3)
// add(5,3,7,2)
// add(8,6,5,7,8,8)
// const x = [23,5,7]
// add(...x);

// restaurant.orderPizza('mushrooms', 'onions', 'o lives', 'lemon');
// restaurant.orderPizza('mushrooms');






// real world example
// const ingrediants = [prompt("ing 1 is"),
//                     prompt("ing 2 is"),
//                     prompt("ing 3 is")];

// restaurant.orderPasta(...ingrediants);

// objects

// const newResturant = {foundingYear:1988, ...restaurant, founder: 'jasdadasdaohn'}

// console.log(newResturant);

// const restaurantCopy = {...restaurant}




/*
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});



const {name, openingHours, categories} = restaurant;

console.log(name, openingHours, categories);

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant

console.log(restaurantName, hours, tags);

// default values
const {menu= [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);


// Mutating variables
let a = 111;
let b = 999;

const obj = {a: 23, b: 7, c: 14};

({a, b} = obj);
console.log(a, b);

// nested objects
const {
  fri: {open, close}
} = openingHours;
console.log(open, close);


// //how to deconstruct ?
// const arr = [2,3,4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x,y,z);

// console.log(arr);



// let [main, , secondary] = restaurant.categories;

// console.log(main, secondary);

// // switching elements

// [main, secondary] = [secondary, main]

// console.log(main, secondary);

// // Recieve 2 return values from a function using deconstruction
// const [starter, mainCource] = restaurant.order(2, 0);
// console.log(starter, mainCource);


// // nested destructing
// const nested = [2, 4, [5, 6]];

// // const [i, ,j] = nested;

// // console.log(i, j);

// const [i, , [j, k]] = nested;

// console.log(i, j, k);

// // Default values

// const [p=1, q=1, r=1] = [8, 9];

// console.log(p, q, r);

*/


// // copy array

// const mainManuCopy = [...restaurant.mainMenu];

// // join two or more arrays

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu]
// console.log(menu);


// // iterables are arrays, strings, maps, sets, BUT NOT objects

// const str = 'jonas';
// const letters = [...str + ' ' + 'S.']
// console.log(letters);


// // copy array

// const mainManuCopy = [...restaurant.mainMenu];

// // join two or more arrays

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu]
// console.log(menu);


// // iterables are arrays, strings, maps, sets, BUT NOT objects

// const str = 'jonas';
// const letters = [...str + ' ' + 'S.']
// console.log(letters);


// // copy array

// const mainManuCopy = [...restaurant.mainMenu];

// // join two or more arrays

// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu]
// console.log(menu);


// // iterables are arrays, strings, maps, sets, BUT NOT objects

// const str = 'jonas';
// const letters = [...str + ' ' + 'S.']
// console.log(letters);






