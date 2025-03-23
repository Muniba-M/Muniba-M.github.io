const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

randomize.addEventListener('click', result);

function result() {
    var newStory = storyText;

    var xItem = randomValueFromArray(insertX);
    var yItem = randomValueFromArray(insertY);
    var zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(":insertx:", xItem);
    newStory = newStory.replaceAll(":inserty:", yItem);
    newStory = newStory.replaceAll(":insertz:", zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);
    
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300);
    const temperature =  Math.round(94);

  }

  story.textContent = ;
  story.style.visibility = 'visible';
}
