// function  cutFruitPieces(fruit) {
//     return fruit * 4;
// }



// function fruitProcessor(apples, oranges) {
//     const applePieces = cutFruitPieces(apples);
//     const orangePieces = cutFruitPieces(oranges);

//     const juice = `Juice with ${applePieces} piece of apples and ${orangePieces} oranges.`;
//     return juice;
//   }


// console.log(fruitProcessor(2, 3));
//   calcAge: function () {
//     this.age = 2037 - this.birthyear;
//     return this.age;
//   },
//   getSummary: function () {
//     return `${this.firstname} is a ${this.calcAge()}-year old ${jonas.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license.`
//   }
// };

// // console.log(jonas.calcAge());

// // console.log(jonas.getSummary());

const types =[];

const jonas = [
  'jonas',
  'schmedtman',
  1991,
  'teacher',
  ['michael', 'peter', 'steven'],
  true
]

for (let i = 0; i < jonas.length ; i++) {
  console.log(jonas[i], typeof jonas[i]);
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}


console.log(types);

const years = [1991, 2007, 1969, 2020];

const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}

console.log(ages);

// continue and break
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas.length ; i++) {
  if (typeof jonas[i] !== 'string') continue;

  console.log(jonas[i], typeof jonas[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < jonas.length ; i++) {
  if (typeof jonas[i] === 'number') break;

  console.log(jonas[i], typeof jonas[i]);
}

