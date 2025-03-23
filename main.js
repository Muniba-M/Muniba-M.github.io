const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// Arrays containing strings to be randomly inserted into the story.
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// The base story text with placeholders for dynamic content.
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {
  var newStory = storyText; // Create a copy of the base story.

  // Get random values from the arrays.
  var xItem = randomValueFromArray(insertX);
  var yItem = randomValueFromArray(insertY);
  var zItem = randomValueFromArray(insertZ);

  // Replace placeholders in the story with the random values.
  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replaceAll(":inserty:", yItem);
  newStory = newStory.replaceAll(":insertz:", zItem);

  // If a custom name is entered, replace "Bob" with the custom name.
  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);

  }

  // If the UK radio button is checked, convert weight and temperature to UK units.
  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 * 0.07142857) + 'Stone';
    const temperature =  Math.round((94 - 32) * 5/9) + 'Centigrade';

    // Replace placeholders with UK units.
    newStory = newStory.replaceAll("94 fahrenheit", temperature);
    newStory = newStory.replaceAll("300 pounds", weight);
  }

  // Display the generated story and make it visible.
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
