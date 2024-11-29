/*
Title  :   Image Gallery
Name   :   Tinu basil
Date   :   Nov 28, 2024
Purpose:   Display image thumbnails with darken/lighten feature
*/

// Constants for image filenames and alternative texts
const IMAGES = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
const ALT_TEXT = {
  'pic1.jpg': 'Closeup of a human eye',
  'pic2.jpg': 'Rock that looks like a wave',
  'pic3.jpg': 'Purple and white pansies',
  'pic4.jpg': 'Section of an Egyptian mural',
  'pic5.jpg': 'Brown and white moth on a leaf'
};

// DOM Elements
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const toggleButton = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Function to create and append thumbnails
function createThumbnails() {
  IMAGES.forEach(image => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', ALT_TEXT[image]);
    thumbBar.appendChild(newImage);

    // Adding click event listener to each thumbnail image
    newImage.addEventListener('click', () => {
      updateDisplayedImage(image);
    });
  });
}

// Function to update the displayed image
function updateDisplayedImage(image) {
  displayedImage.setAttribute('src', `images/${image}`);
  displayedImage.setAttribute('alt', ALT_TEXT[image]);
}

// Function to toggle overlay effect
function toggleOverlay() {
  const isDark = toggleButton.getAttribute('class') === 'dark';
  if (isDark) {
    setOverlayLight();
  } else {
    setOverlayDark();
  }
}

// Function to set overlay to light mode
function setOverlayLight() {
  toggleButton.setAttribute('class', 'light');
  toggleButton.textContent = 'Lighten';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
}

// Function to set overlay to dark mode
function setOverlayDark() {
  toggleButton.setAttribute('class', 'dark');
  toggleButton.textContent = 'Darken';
  overlay.style.backgroundColor = 'rgba(0,0,0,0)';
}

// Event Listener for the Darken/Lighten button
toggleButton.addEventListener('click', toggleOverlay);

// Initialize thumbnails
createThumbnails();
