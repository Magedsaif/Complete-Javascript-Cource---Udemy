'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const renderCountry = function (data, className = '') {
//   const html = `<article class="country ${className}">
//                 <img class="country__img" src="${data.flag}" />
//                 <div class="country__data">
//                   <h3 class="country__name">${data.name}</h3>
//                   <h4 class="country__region">${data.region}</h4>
//                   <p class="country__row"><span>👫</span>${(
//                     +data.population / 1000000
//                   ).toFixed(1)} people</p>
//                   <p class="country__row"><span>🗣️</span>${
//                     data.languages[0].name
//                   }</p>
//                   <p class="country__row"><span>💰</span>${
//                     data.currencies[0].name
//                   }</p>
//                 </div>
//               </article>`;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };
//////////////////////////////////////////////////
// ASYNCHRONOUS JAVASCRIPT. AJAX AND APIS
// Asynchronous coordinats behavior of a program over a period of time.
// not happining in the same time
// we defer an action into the future making the code asynchronous

// AJAX: Asynchronous JavaScript And XML: allows us to communicate with remote web servers in an asynchronous way. Allows us to request data from web servers dynamically.

// API: Application Programming Interface: piece of software that can be used by another piece of software, in order to allow applications to talk to each other. In web development, an API is a piece of software that will allow two applications to talk to each other over the internet.

// API is not a database or a server. It is the code with access points to the server.

// some APIs are public, some are paid, some are private.

// "online" API: Application running on a server, that receives requests for data, and sends data back as response.

// we can build our own API (requires backend development skills) or use a third party API.
//  XMLHttpRequest (XHR) object: API in the form of an object, provided to us by the browser, to be used by client-side scripts like JavaScript. It is used to make HTTP requests to the server. It can send data to, and receive data from, a web server.
// we dont use XML anymore, we use JSON (JavaScript Object Notation) instead.
/////////////////////////////////////////////////////////////////////
// our first AJAX call (XMLHttpRequest)
//------------------------------------------------------------------

// Old school way
/* const getCountryData =function(country){
const request = new XMLHttpRequest();

request.open('GET', `https://restcountries.com/v2/name/${country}`);
request.send(); //here we send the request which will fetch the data in the background once its done it will emmit the load event, so as soon the data arrives the call back function in the add event listner will be called

request.addEventListener('load', function () {
  console.log(this.responseText);

  const [data] = JSON.parse(this.responseText);
  console.log(data);

  const html = `<article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
})}


getCountryData('portugal');

*/

/////////////////////////////////////////////////////////////////////
// CALLBACK HELL
//------------------------------------------------------------------

/* 

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbour = function (country) {

    // Ajax call country 1
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send(); //here we send the request which will fetch the data in the background once its done it will emmit the load event, so as soon the data arrives the call back function in the add event listner will be called

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // render country 1
    renderCountry(data);

    // GET neighbour country (2)

    // using optional chaining to handle the case where country has no borders
    const neighbour = data.borders?.[0];

    // Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function(){
        const data2 = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, 'neighbour');
    })
  });
};
getCountryAndNeighbour('usa');

// what if we want to get the neighbour of the neighbour country? we will have to nest another call back inside the second callback and so on. this is called callback hell.
// callback hell: when we have a lot of nested callbacks, which makes the code hard to read and maintain.
// we will solve this problem using promises in the next lecture.


setTimeout(() => {
  console.log('1 second passed');
}, 1000); // this is an asynchronous function. it will be executed after 1 second. it will not block the code execution.

 */

/////////////////////////////////////////////////////////////////////
// PROMISES AND FETCH API
//-------------------------------------------------------------------

// Promises: object that is used as a placeholder for the future result of an asynchronous operation.
// A promise is a container for an asynchronously delivered value.
// A promise is a container for a future value. e.g. response from an AJAX call.

// A promise is a special JavaScript object that links the production code and the consuming code together.

// fetch API: modern way of making HTTP requests. It is a browser API, not a JS API. It returns a promise.

// this is how we used to do it before promises
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// this is how we do it with promises

// const request = fetch('https://restcountries.com/v2/name/portugal'); // this will return a promise

// we no longer need to create an event listener to listen to the load event. we can simply use the then method on the promise object to handle the response.

// instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations, one after another, where each one starts when the previous one finishes.: escaping callback hell.

// the callback function in the then method will be called as soon as the promise is fulfilled. the response will be passed to the callback function as an argument which is the resulting value of the fullfilled promise.

// then method always returns a promise. nomatter what we return from the callback function. if we return a value, the next then method will receive that value as an argument. if we return a promise, the next then method will wait for that promise to be fulfilled and then it will receive the resulting value as an argument.

// when returining a value, that value will become the fulfilled value of the promise returned by the then method.
// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       // we can check if the response is ok or not using the ok property of the response object. it will be true if the response is ok and false if not.
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       // any error thrown in the callback function of the then method will terminate that then and will be caught by the catch method of the promise.
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       // country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//       // return 23; // this will become the fulfilled value of the promise returned by the then method
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// refactor the above code using getJson function
// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// thats a flat chain of promises.

/////////////////////////////////////////////////////////////////////
// Handling Rejected Promises
//-------------------------------------------------------------------
// we can handle rejected promises using the catch method. it will catch any error that happens in any of the promises in the chain.
// errors basically propagate down the chain until they are caught, and only if they are not caught, they will be thrown to the outside of the promise chain, where they will become uncaught errors.

// btn.addEventListener('click', function () {
//   whereAmI(52.508, 13.381);
// });

// getCountryData('ausdsfsdsd');

///////////////////////////////////////
// Coding Challenge #1

/*
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

/////////////////////////////////////////////////////////////////////
// THE EVENT LOOP IN PRACTICE
//-------------------------------------------------------------------
// the event loop is the secret behind the asynchronous behavior of JavaScript.
// the event loop takes tasks from the callback queue and puts them in the call stack, as soon as the call stack is empty.
// promises resolve in the microtask queue, which has a higher priority than the callback queue. so promises are always resolved before the callback queue. thats why the message from the promise is logged before the message from the callback function in the setTimeout function.

/*
console.log(`Test start`);
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log(`Test End`);
 */

/////////////////////////////////////////////////////////////////////
// BUILDING A SIMPLE PROMISE
//-------------------------------------------------------------------

// the promise object takes executor function as an argument. the executor function takes two arguments, resolve and reject. these are two functions that are automatically passed into the executor function by the promise constructor.
/* 
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery is happenning');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('YOU WIN');
    } else {
      reject(new Error('You lost youe money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));


// promisifying means converting callback based asynchronous behavior to promise based asynchronous behavior.

// promisifying setTimeout
const wait = function(seconds){
  return new Promise(function(resolve){
    setTimeout(resolve, seconds * 1000);
  })
}

wait(2).then(() => {
  console.log('i wated for 2 seconds');
  return wait(1);
}).then(()=> console.log('i wated for 1 seconds'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem')).catch(x => console.error(x));
 */

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err));
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

//////////////////////////////////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imgContainer = document.querySelector('.images');

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const createImage = function (imagePath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imagePath;
//     img.addEventListener('load', () => {
//       imgContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// let currenImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currenImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currenImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currenImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currenImg.style.display = 'none';
//   })
//   .catch(err => console.log(err));

//////////////////////////////////////////////////////////////////////
// consuming promises with AsyncAwait
//-------------------------------------------------------------------
// async await is just syntactic sugar over the promises. it is just a different way of writing promises. it makes the code look like synchronous code.

// await will stop the code execution until the promise is fulfilled. await can only be used inside an async function.
// async doesnt block the code execution. it is non blocking. it will return a promise. the promise will be fulfilled with the value that we return from the async function. if we dont return anything, the promise will be fulfilled with undefined. if we throw an error, the promise will be rejected with that error.
// it makes the code look like synchronous code. but it is not. it is still asynchronous in the background, it is still promises. it is just syntactic sugar over promises.

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    if(!res.ok) throw new Error('Problem getting country');
    const data = await res.json(); // without chaining then method to the fetch promise, we can use await to get the data from the promise.
    console.log(data);
    renderCountry(data[0]);
  } catch (err) {
    // catch block will catch any error that happens in the try block or in any of the promises in the try block. if we dont catch the error, it will be thrown to the outside of the async function, where it will become an uncaught error.
    console.error(`${err} 💥💥💥`);
    renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
  }

  // this is how we used to do it before async await.
  // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => {
  //   console.log(res);
  //   return res.json();
  // }).then(data => {
  //   console.log(data);
  //   renderCountry(data[0]);
  // });
};
whereAmI();

console.log('First');
