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

///////////////////////////////
// Add cookie message
const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Insert cookie message to DOM
const header = document.querySelector('.header');
header.before(message);

// Delete element on click
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Style cookie message
message.style.backgroundColor = '#37383d';
message.style.width = '100%';
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 22 + 'px';

// Add scroll on `Learn more` button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
