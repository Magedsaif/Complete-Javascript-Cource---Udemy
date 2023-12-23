'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// Dom is the interface between our code and the browser (HTML Documents that is rendered in and by the browser)
// we can use it to make  hs interact with the browser
// DOM is a very complex API that contains methods and properties to interact with the DOM tree
////////////////////////////////////////////////////////////////////
//Lec 5. Selecting, Creating AND Deleting Elements
// -----------------------------------------------------------------
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // return HTML collection(live collection) that means that if the DOM changes so that collection would be changed automatically that doesnt work with a node list

document.getElementsByClassName('btn'); // return live collection

// Creating and Inserting elements
// quick and easy way to create elements
//.insertAdjacentHTML
// but we could use another method to bulid the element from scratch more programatically

// programatically build an element
const message = document.createElement('div'); // live element
message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved functionality and analytics';
message.innerHTML =
  'we use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

// we have to insert it in our DOM -insert in our header element-
// prepend adds the element as the first child of the header element
// header.prepend(message);
// we could also add as the last child element to the header element
header.append(message); // this will be applied cause its like the person that cannot be at two places at the same time

// what if we want to insert multiple copies of the same element
// header.append(message.cloneNode(true));
// that gave me the message in two places

// header.before(message);
// header.after(message);

// delete elements
// remove the element when we click a button
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // its recent, the other way
    // message.parentElement.removeChild(message); (DOM traversing)
  });


  //////////////////////////////////////////////////////////////////