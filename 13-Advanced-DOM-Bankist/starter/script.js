'use strict';
// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
//////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////////////
// Button scrolling
//-------------------------------------------------------------------

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); //getting coordinates
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); //relative to view port

  console.log('current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // //scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   rs1coords.top + window.scrollY
  // ); // top is relative to view port and not the document so we added the page

  // old school, works but manually calculate the coordinates and add to it to go to a certain positions
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //modern way of doing the smooth scroll
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////
//  lec.11 Smooth Page Navigation
//-------------------------------------------------------------------

// first we will implemenmt it without using event delegation.

/* document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();

    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  })
})
 */

// tip from MDN to improve performance using event delegation

/*
Another tip is to use event delegation wherever possible. When you have some code to run in response to a user interacting with any one of a large number of child elements, you can set an event listener on their parent. Events fired on any child element will bubble up to their parent, so you don't need to set the event listener on each child individually. Less event listeners to keep track of means better performance.
*/

// Thats Not A Clean Solution So We Need to use event delegation

// 1. add event listners to common parent element of all the elements thats we are interested in
// 2. determine what element originated the event, then work with that element

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // now we need to know where the event had happend
  e.preventDefault();
  // Matching strategy
  // this is important to ignore the clicks that not happend right on the elements itself
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//this is not a good practice
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

// we should use event delegations

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //guard clause so if i clicked in any other places and gave me null cause the click then desnt have a closest element called operations tab so it returs from the function

  if (!clicked) return;

  // remove active classes
  //putting the other tabs down when a one has been clicked.
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////////////
// lec 14. Menu Fade Animation
//-------------------------------------------------------------------

// handling the  events of whole the nav links throughout the event delegation

// mouseover bubbles unlike the mouse enter
// the opposite is mouseout and mouseleave

// in order to DRY our code
// REFACTOR to a new function called handleHover

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // we use e.target and not closest method because there are no any other element that i could click by mistake

    const link = e.target;

    //selecting the siblings with certain match so we use closest
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // changing the opacity of the siblings link
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// bind method passing an "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// Dom is the interface between our code and the browser (HTML Documents that is rendered in and by the browser)
// we can use it to make  hs interact with the browser
// DOM is a very complex API that contains methods and properties to interact with the DOM tree
////////////////////////////////////////////////////////////////////
//Lec 5. Selecting, Creating AND Deleting Elements
// -----------------------------------------------------------------
/* console.log(document.documentElement);
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
 */
//////////////////////////////////////////////////////////////////
// LEC.6 Styles, Attributes and Classes
//----------------------------------------------------------------

/* //Styles
message.style.backgroundColor = '#37383d'; // inline styling to the elemnt
message.style.width = '120%'; // inline styling to the elemnt

console.log(message.style.color); // that wont give anyhting cause it only works for the inline style that we set ourselves

console.log(message.style.backgroundColor);

console.log(getComputedStyle(message)); // contains all the properties and styles

console.log(getComputedStyle(message).color); // return the color

console.log(getComputedStyle(message).height); // even if we did not compute it by ourselves the browser set it automatically

// we could use getComputedStyle method to add certain values to any element property
// we used Number.parseFloat() to get the 40 out of the returned string and convert it into numbers in order to add to this property
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// this well chang the color of the property we customized in the root of our CSS to any color we want across the document.
// with a simple line of code we could change the color in all of our documnet
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// we can access that atts

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
//Non-standard
// console.log(logo.designer);
console.log(logo.className);
console.log(logo.getAttribute('designer')); // way to read non `standard attributes

logo.alt = 'Beutiful logoooooo';
//creating atts
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);

//Classes

logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes
*/
/////////////////////////////////////////////////////////////////////
// lec.7 Smooth Scrolling
//-------------------------------------------------------------------
/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(); //getting coordinates
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); //relative to view port

  console.log('current scroll (X/Y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // //scrolling
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   rs1coords.top + window.scrollY
  // ); // top is relative to view port and not the document so we added the page

  // old school, works but manually calculate the coordinates and add to it to go to a certain positions
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  //modern way of doing the smooth scroll
  section1.scrollIntoView({ behavior: 'smooth' });
}); */
////////////////////////////////////////////////////////////////////
// Events and its types
//------------------------------------------------------------------

const h1 = document.querySelector('h1');
// addeventlistner is way better cause it allow us to add multiple evenlisners to the same event, and we can remove an event handler in case we dont need it anymore

// const alertH1 = function (e) {
//   alert('addEventListner: Great! you are reading the heading');
//   //remove after i click ok on the alert listening once
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);
// // removing the alert after certain time
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// another way to attach eventlistner to an element
// old way
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! you are reading the heading');
// };
// on HTML onclick="alert('HTML alert')

////////////////////////////////////////////////////////////////////
// Event propagation: Bubbling and capturing
//------------------------------------------------------------------

// rgb(255,255,255)

// IMPORTANT NOTE: events are captured when come down from the document route all the way down to the target, but our event handlers are not picking up these events during the capture phase and that is the default behavior.

// bubbling phase is useful for event delegation
// but if you want to catch an events in the capturing phase you can define a third parameters in the addeventlistner function for true and false
// true to make it catch the event in the capturing phase
// its false by default

/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`Link`, e.target ,e.currentTarget );
  console.log(e.currentTarget === this);
  // this Keyword is the one pointing to the elementon which the eventlistner is attached to

  //Stop probagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`container`, e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`NAV`, e.target, e.currentTarget);
});
 */

/////////////////////////////////////////////////////////////////////
// Lec.12 DOM Traversing
// -------------------------------------------------------------------

//const h1 = document.querySelector('h1');

/* // Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';
// querselector finds chilren no matter how they are deep in the dom tree
// closest finds parents no matter how they are far up the dom tree

// Going Sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// for nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// read all the children by moving up to the parent element
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el != h1) {
    el.style.transform = 'scale(0.5)';
  }
});
 */

/////////////////////////////////////////////////////////////////////
// Lec.13 Tapped Component
// -------------------------------------------------------------------
