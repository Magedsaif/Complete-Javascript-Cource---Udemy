// importing modules
// console.log('Exporting module');

// Blocking code
// only after this code is executed, the rest of the code will be executed
// using top level await will block the entire module in a way that we really could not block code execution before.

// console.log('start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finish fetching');


/* const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 273;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };


export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  }; */