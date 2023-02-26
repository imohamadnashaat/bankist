'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const h1 = document.querySelector('h1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const tabContainer = document.querySelector('.operations__tab-container');
const contents = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookie message
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Insert cookie message to DOM
header.append(message);

// Delete element on click
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Style cookie message
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 22 + 'px';

///////////////////////////////////////
// Scroll button
btnScrollTo.addEventListener('click', () => {
  const s1coords = section1.getBoundingClientRect();

  // Scroll
  window.scrollTo({
    top: s1coords.top + window.scrollY,
    left: s1coords.left + window.scrollX,
    behavior: 'smooth',
  });

  // Scroll in a modern way, not support it on all browser
  // section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Welcome alert
const welcomeAlert = () => {
  alert('Welcome to our website :D');
};

// Add welcome event
h1.addEventListener('mouseenter', welcomeAlert);
// Remove welcome event
setTimeout(() => {
  h1.removeEventListener('mouseenter', welcomeAlert);
}, 100);

///////////////////////////////////////
// Tabbed component
tabContainer.addEventListener('click', function (e) {
  const btnTab = e.target.closest('.operations__tab');

  // Guard clause
  if (!btnTab) return;

  // const btnNum = btnTab.getAttribute('data-tab');
  const btnNum = btnTab.dataset.tab;

  // Remove active from current tab
  tabs.forEach(tab => {
    if (tab.classList.contains('operations__tab--active')) {
      tab.classList.remove('operations__tab--active');
    }
  });

  // Add active tab
  if (btnTab.classList.contains('operations__tab')) {
    btnTab.classList.add('operations__tab--active');
  }

  // Remvoe active content
  contents.forEach(content => {
    content.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${btnNum}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal section on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Event Propagation in Practice
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  // console.log('LINK', e.target, e.currentTarget);
  // console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('NAV', e.target, e.currentTarget);
});
*/

// DOM traversing
/*
const h1El = document.querySelector('h1');

const highlight = h1El.querySelectorAll('.highlight');

// console.log(h1El.childNodes);
// console.log(h1El.children);

h1El.firstElementChild.style.color = 'white';
h1El.lastElementChild.style.color = 'gray';

// console.log(h1El.parentNode);
// console.log(h1El.parentElement);

h1El.closest('.header').style.background = 'var(--color-tertiary)';
h1El.closest('h1').style.background = 'white';

console.log(h1El.previousElementSibling);
console.log(h1El.nextElementSibling);

console.log(h1El.parentElement.children);

[...h1El.parentElement.children].forEach(
  el => (el.style.transform = 'scale(0.8)')
);
*/
