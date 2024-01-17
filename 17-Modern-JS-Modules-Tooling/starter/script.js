// Importing module
// all import are always hoisted
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// console.log('Importing module');
// import * as shoppingCart from './shoppingCart.js';

// shoppingCart.addToCart('bread', 5);

// mix named and default (NOT GOOD)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('pizza', 2);

/* import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 2);
add('apples', 2);

console.log(cart);
 */
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// console.log('something');

/* const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return {title: data.at(-1).title, text: data.at(-1).body}
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
lastPost.then(last => console.log(last))


const lastPost2 = await getLastPost();
console.log(lastPost2); */

//////////////////////////////////////////////////////////////////////
// the module pattern
//--------------------------------------------------------------------

// IFIE
/* const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} order from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();


shoppingCart2.addToCart('apple', 4);
shoppingCart2.addToCart('pizza', 2);

console.log(shoppingCart2);
console.log(shoppingCart2.shippingCost);// undifined because we didnt make it public and thats the implementation of the module pattern

// this IFIE has returned  ago, so how i had the oppurtinuity to manipulate the cart variable

// closures allow a function to have access to all the variables that were present in its birthplace */

/////////////////////////////////////////////////////////////////////
// Common JS Modules
//-------------------------------------------------------------------

// common js modules are used in node js and not in the browser (node js is a runtime environment for js outside the browser)

// just like es6 modules, in common js modules, each file is a module and all the variables and functions defined in that module are scoped to that module and not visible outside of it

// in common js modules, we use require function to import functionality from other modules

// in common js modules, we use module.exports to export functionality from a module

// // export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
// };

// // import
// const { addToCart } = require('./shoppingCart.js');