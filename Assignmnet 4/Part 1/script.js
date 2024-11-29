/*
  Title: assignment-4 part 1
  Name: Tinu basil
  Date: Nov 28,2024
  purpose: Random Story Generating 
*/

// Constants
const FAHRENHEIT = 94;
const POUNDS = 300;

// DOM Elements
const customNameInput = document.getElementById('customname');
const randomizeButton = document.querySelector('.randomize');
const storyElement = document.querySelector('.story');

// Arrays for Random Values
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// Story Template
const storyTemplate = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

// Helper Functions
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function replacePlaceholders(template, xItem, yItem, zItem, name) {
  let story = template;
  story = story.replace(/:insertx:/g, xItem);
  story = story.replace(':inserty:', yItem);
  story = story.replace(':insertz:', zItem);
  if (name) {
    story = story.replace('Bob', name);
  }
  return story;
}

function convertUnitsForUK(story) {
  const weightInStone = Math.round(POUNDS * 0.0714286) + ' stone';
  const tempInCentigrade = Math.round((FAHRENHEIT - 32) * 5 / 9) + ' centigrade';
  story = story.replace('94 fahrenheit', tempInCentigrade);
  story = story.replace('300 pounds', weightInStone);
  return story;
}

function generateRandomStory() {
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);
  const name = customNameInput.value;

  let newStory = replacePlaceholders(storyTemplate, xItem, yItem, zItem, name);

  if (document.getElementById("uk").checked) {
    newStory = convertUnitsForUK(newStory);
  }

  return newStory;
}

// Event Listener
randomizeButton.addEventListener('click', () => {
  const story = generateRandomStory();
  storyElement.textContent = story;
  storyElement.style.visibility = 'visible';
});
