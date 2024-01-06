'use strict';

// user story: Describes how a user will interact with our application and how the application will respond to that interaction. OR It is a description of the application's functionality from the perspective of the user.

// common format: As a <type of user>, I want <an action> so that <a benefit>.
// answers the question: Who, What, Why ?

// 1: As a user, I want to log my running workouts with location, distance, time and pace so I can keep a log of all my running.

// 1: features: Map where we can click to add new workout,

//geolocation to display map at current location, running and cycling icons for different workouts,

//form to input distance, time, pace, and cadence,

// 2: As a user, I want to log my cycling workouts with location, distance, time, speed and elevation gain so I can keep a log of all my cycling.

// 2:features, form to input distance, time, speed, elevation gain, and elevation gain.

// 3: As a user, I want to see all my workouts at a glance so I can easily track my progress over time.

// 3:features, display all workouts in a list

// 4: As a user, I want to also see my workouts on a map so I can easily check where I work out the most.

// 4:features, display all workouts on a map

// 5: As a user, I want to see all my workouts when I leave the app and come back later so that I can keep using the app over time.
// 5:features, store workout data in the browser using local storage API
// 5:features, on page load, read the saved data from local storage and display

// 5:features, move map to workout location on click

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation)
  // Geolocation API
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // using destructuring
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude]
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position');
    }
  );
