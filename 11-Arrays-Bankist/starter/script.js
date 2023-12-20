'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// adding the sorting feature
// we make it by default falsy because we want the sorting to be as
// it is, if we want to do otherwise we will call that function with
// sort argument set to true with click event
const displayMovements = function (movements, sort = false) {
  // to empty what is already there
  //.textContent = 0
  containerMovements.innerHTML = '';

  // if sort is true (sorting conditionally)
  // create a copy using slice to prevent modifying the original array
  const movs = sort ? movements.slice().sort((a,b) => a - b) : movements

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__value">${mov} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;

};


// called upon the account to show each accounts interst rate
const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`
  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => deposit * acc.interestRate/100)
  .filter((int, i, arr) => {
    return int >= 1;
  })
  .reduce((acc,int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

  const updateUI = function (acc){
    // Display movements
    displayMovements(acc.movements);
    // Display balance
    calcPrintBalance(acc);
    // Display summary
    calcDisplaySummary(acc);
  };

// // we want to computed the user name
createUserNames(accounts);

//Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e){
  // prevent form from submitting and refreshimg the page.
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);
  // the ? means that the whole parameter would be read just if the currentAccount is present. (optional chaining)

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    // using split to just show the first name
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
    // Manipulating the style to show up the main container page.
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur()
    //update UI
    updateUI(currentAccount);
  }
})

btnTransfer.addEventListener('click', function(e){
  // also here we want to prevent the default behavior
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = '';


  if (amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username) {
        // Doing the tranfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        //update UI
        updateUI(currentAccount);
      }
})

btnLoan.addEventListener('click', function (e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if(amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
      ){
        // Add Movement
        currentAccount.movements.push(amount);

        // Updat UI
        updateUI(currentAccount);
    }
    // clear fields
    inputLoanAmount.value = '';

})




btnClose.addEventListener('click', function(e){
  e.preventDefault();
  inputTransferAmount.value = inputTransferTo.value = '';

  const inputUser = inputCloseUsername.value;
  const inputPin = Number(inputClosePin.value);

  if (inputUser === currentAccount.username &&
        inputPin === currentAccount.pin) {
        // getting the index of the current account to use it to delete the user using the splice method.

        // FINDINDEX Method
        // it will return the first element in the array that mets the condition
        const index = accounts.findIndex(
          acc => acc.username === currentAccount.username);
          console.log(index);
        //.indesxof() we only search for a value in the array
        //findindex gives us complicated uses

        // delete account
        accounts.splice(index, 1);

        // hide UI
        containerApp.style.opacity = 0;
      }
  // clearing the fields.
  inputClosePin.value = inputCloseUsername.value = '';
})

// create a state variable
let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  // makeing ths sort true to call the function that sorts which we deployed in the display Movements
  displayMovements(currentAccount.movements, !sorted);
  // every time we click we change the sorted from true to false
  sorted = !sorted;
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a','b','c','d','e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(1, -1));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// // To Get a Shallow copy of an array you can eathier do both.
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE - to mutate the orginal array
// // the extracted elemnts are actualy gone from the array
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1,2);
// console.log(arr);

// // REVERSE
// // mutate the array
// arr = ['a','b','c','d','e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // concate
// // does not mutate the original array
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr], [...arr2]);
// console.log(arr);
// console.log(arr2);

// // JOIN
// console.log(letters.join(' - '));

////////////////////////////////////////////////////////
// AT Method
//---------------------------------------------------------------

// const arr = [23, 11, 64];
// console.log(arr[0]); // to get the first element
// console.log(arr.at(0)); // same but modern, also
// // to get the last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);// to take that value we add the square bracket [0]
// // using at giving it more easier deal with
// console.log(arr.at(-1));
// // also works with strings

// console.log('object'.at(-1));
///////////////////////////////////////////////////////////////////////
// Loop on an array using FOR EACH
//---------------------------------------------------------------

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // first will use for of loop

// // for (const movement of movements) {
//   // (((to access the counter variable in the forOf loop use entries method to)))
//   for (const [i, movement] of movements.entries()){
//   if (movement > 0) {
//     console.log(`Movement ${i+1}: you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i+1}: you withdrew ${Math.abs(movement)}`); // to remove the sign
//   }
// };
// console.log(`--------ForEach-------`);
// // using the for each method toachieve the same result but in a much easier way

// // for each is a higher order function wich requires a callback function-forech will call the call back function

// // ForEach will loop over the array and execute the callback function in each iteration, and will pass the current element as an argument.

// // naming doesnt matter but the order does
// // each iteration contains the index and the whole array
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i+1}: you deposited ${mov}`);
//   } else {
//     console.log(`Movement ${i+1}: ou withdrew ${Math.abs(mov)}`); // to remove the sign
// }});

// // iteration 0 : function(200)
// // iteration 1 : function(450)
// // // // iteration 2 : function(400)
// // ...

////////////////////////////////////////////////////////////

// ForEach with maps and sets
//---------------------------------------------------------------

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// // three args 1. current value of current iteration
// // 2. the key 3. entire map
// currencies.forEach(function(value, key, map){
//   console.log(`${key}: ${value}`);
// });

// // Set
// // doesnt have key or indexs
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function(value, _, map){
//   console.log(`${value}: ${value}`);
// })

///////////////////////////////////////
// Coding Challenge #1
//---------------------------------------------------------------

// /*
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const checkDogs = function(dogsJulia, dogsKate){
//   const correctedArr = dogsJulia.slice(1,-1);
//   const dogs = correctedArr.concat(dogsKate);
//   dogs.forEach(function(dogAge, i, arr){
//     if (dogAge >= 3) {
//       console.log(`Dog number ${i + 1 } is an adult, and is ${dogAge} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs(dogsJulia,dogsKate);

////////////////////////////////////////////////////////////////////
// Map
//---------------------------------------------------------------

// returns a new array containing the resultes of applying an operation on all original array elements
// using functional programming this is the modern JS

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;

// const movementsUSD = movements.map(function(movElement){
//   return movElement * euroToUsd;
// });

// using arrow function in the callback function
// param => expression
// const movementsUSD = movements.map(
//   movElement => movElement * euroToUsd);

// console.log(movements);
// console.log(movementsUSD);

// // using for of

// const newArr = [];
// for (const movElement of movements) {
//   newArr.push(movElement * euroToUsd);
// }
// console.log(newArr);

// // Map also have access to currrent index and whole array in addition to array elements

// const movementsDesc = movements.map((movElement, i, arr) => {
//     if (movElement > 0) {
//     return `Movement ${i+1}: you deposited ${movElement}`;
//   } else {
//     return `Movement ${i+1}: you withdrew ${Math.abs(movElement)}`; // to remove the sign
//   }
// });

// console.log(movementsDesc);
////////////////////////////////////////////////////////////////////
// Filter
//---------------------------------------------------------------

// filters returns a new array containg the array elements that passed a specified test condition
// accesses the index as well as the whole array in addition of cource to the element it self

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// create a deposit array with all the movements above zero
//returns a boolean
// const deposits = movements.filter(mov => mov > 0
// );
// console.log(deposits);

// // using for of
// const positiveMov = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     positiveMov.push(mov)
//   }
// }
// console.log(positiveMov);

// const withdrawals = movements.filter(mov => mov < 0);
//   console.log(withdrawals);

///////////////////////////////////////////////////////////////////
// Reduce
//---------------------------------------------------------------
// reduces all array elements down to one single value (e.g adding all elements together)

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// first is accumalator is like snowball then current element then current index then entire array
// const balance = movements.reduce(function(acc, curr, i, arr){
//   console.log(`iteration ${i}: ${acc}`);
//   return acc + curr;
// }, 0); // 0 is the initial value we want to start adding on

// using arrow function
// const balance = movements.reduce(
//   (acc, curr) => acc + curr, 0);
//  // 0 is the initial value we want to start adding on

// console.log(balance);

// // using for of loop
// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov
// }
// console.log(balance2);

// // using reduce to get the max value of the movements array

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov)
//     return acc;
//   else
//     return mov
// }, movements.at(0));
// // dont put 0 when you try to get a max or a min value always using the first element of the array

// console.log(max);

// Coding Challenge #2

// /*
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */

// const ages = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (ages){
//   const humanAges = ages.map(function(age){
//   if (age <= 2){
//     return 2 * age;
//   } else {
//     return 16 + age * 4;
//   }
// });
// const adults = humanAges.filter(age => age >= 18);
// console.log(humanAges);
// console.log(adults);

// const average = adults.reduce((acc,age) => acc + age, 0) / adults.length;
// return average
// };

// const avg = calcAverageHumanAge(ages);

// console.log(avg);

//Pipeline
// const euroToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);



// Coding Challenge #3

// /*
// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀
// */



// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// adults.length

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2)


///////////////////////////////////////////////////////////////////
// FIND method
//-----------------------------------------------------------------

// it will return the first element in the array that meets the requirements of the condition
// its similar to filter method, filter returns all the elements that meets the condition, while find returns the first element that meets the condition
// filter returns a new array, while find returns an element
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// console.log(accounts);
// // Reminder: as we loop over the aray each current element is the acc.
// const account = accounts.find(acc => acc.owner === "Jessica Davis");

// console.log(account);

/////////////////////////////////////////////////////////////////////
// SOME Method
// ----------------------------------------------------------------

// console.log(movements);
// console.log(movements.includes(-130)); // returns true if its exactly equal to -130
// // includes method test for equality
// // what if we want to test for condition
// // some metod is the right choice
// // returns true or false
// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

/////////////////////////////////////////////////////////////////////
// EVERY Method
//------------------------------------------------------------------

// only returns true if all the element passes the condition in our callback function


// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // DRY princibal
// // Dont repeat yourself
// // Seperate CallBack from the array method
// const deposit = mov => mov > 0;
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

////////////////////////////////////////////////////////////////////
// Flat Method
//------------------------------------------------------------------
// only goes one level deep of nesting
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// console.log(arr.flat());
// // now two level of nesting
// const arrDeep = [[[1,2],3], [4,[5,6]], 7, 8];
// // now using the depth argument in the flat method to flatten it
// console.log(arrDeep.flat(2));

// // to get all the movements from all the accounts.

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// // adding all movements to get the bank overall balnce
// const overallBalance = allMovements.reduce((acc,curr) => acc + curr, 0);

// console.log(overallBalance);

// // using the chaining method


// const allMovementsChaining = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc,curr) => acc + curr, 0);

// console.log(allMovementsChaining);

// ////////////////////////////////////////////////////////////////////
// // FlatMAP Method
// //------------------------------------------------------------------
// // compining those nethods into one which is very common to use
// // so for performane inhancement
// // it flats one level of depth only
// const allMovementsChaining2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc,curr) => acc + curr, 0);


////////////////////////////////////////////////////////////////////
// sorting arrays
//------------------------------------------------------------------
// sort method Mutates the original array
//strings
// const owners = ['jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // numbers
// // console.log(movements);
// // console.log(movements.sort());

// // [-130, -400, -650, 1300, 200, 3000, 450, 70]
// // thats not sorted in any way cause the sort method does the sorting based on strings by converting every thing to string and sort them

// // 1 > 4 > 6 and the negtive comes first

// console.log(movements);
// // a and b is the current value and the next value
// // return < 0, to arrange like that A, B (keeps order)
// // return > 0, to arrange like that B, A (switchs order)

// // Ascending
// // movements.sort((a,b) => {
// //   if (a > b) return 1;
// //   if (b > a) return -1;
// // });
// // Improve it
// // returning positve value from the substraction means that a > b
// // returning negative value from the substraction means that a < b
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descinding
// // movements.sort((a,b) => {
// //   if (a > b) return -1;
// //   if (b > a) return 1;
// // });
// // Improve it
// movements.sort((a, b) => b - a);
// console.log(movements);

//////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------
//  More ways to create arrays and filling it

// normal ways to print or make arrays
const arr = [1,2,3,4,5,6,7];
console.log([1,2,3,4]);
console.log(new Array(1,2,3,4));
const x = new Array(7);
// it creats an array with 7 empty elements
console.log(x);
// x.fill(1);
//start filling in index 3 and end at 5
x.fill(1,3,5)
console.log(x);

// we could fill an existing array

arr.fill(23,2,6);
console.log(arr);

Array.from
const y = Array.from({length: 7}, () => 1);
console.log(y);

const z = Array.from({length: 7}, (_, i) => i+1);
console.log(z);

// creating random dice rolls from 1 to 100
const random = Array.from(
  {length: 100},
  () => Math.floor(Math.random() * 100)
  );
console.log(random);


// getting the movements from the UI
// the element we got from the ui we want to convert to an array
// so we use the array from method on it then map method to extract the text content and replace the euro sign with nothing.
// the result of the queryselector all is a node list

labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(document.
  querySelectorAll('.movements__value'),
  el =>Number(el.textContent.replace('€', ''))); // putting it as the mapping function instad of calling it over the movUI

  //console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
  console.log(movementsUI);
  // another way to transform the nodelist into array using destructing but we shall do the mapping separatly
  const movementsUI2 = [...document.
  querySelectorAll('.movements__value')];
});
