'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
    }

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
                  <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                  }</p>
                </div>
              </article>`;
      
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
      };
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

const request = fetch('https://restcountries.com/v2/name/portugal'); // this will return a promise

// we no longer need to create an event listener to listen to the load event. we can simply use the then method on the promise object to handle the response.

// instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations, one after another, where each one starts when the previous one finishes.: escaping callback hell.

// the callback function in the then method will be called as soon as the promise is fulfilled. the response will be passed to the callback function as an argument which is the resulting value of the fullfilled promise.

// then method always returns a promise. nomatter what we return from the callback function. if we return a value, the next then method will receive that value as an argument. if we return a promise, the next then method will wait for that promise to be fulfilled and then it will receive the resulting value as an argument.

// when returining a value, that value will become the fulfilled value of the promise returned by the then method.



const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
      // return 23; // this will become the fulfilled value of the promise returned by the then method
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
    }).finally(() => {
        countriesContainer.style.opacity = 1;
    });
};
// thats a flat chain of promises.

/////////////////////////////////////////////////////////////////////
// Handling Rejected Promises
//-------------------------------------------------------------------
// we can handle rejected promises using the catch method. it will catch any error that happens in any of the promises in the chain.
// errors basically propagate down the chain until they are caught, and only if they are not caught, they will be thrown to the outside of the promise chain, where they will become uncaught errors.


btn.addEventListener('click', function () {
  getCountryData('portugal');
});