'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

