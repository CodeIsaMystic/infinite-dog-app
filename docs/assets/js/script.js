"use:strict";
/**  setTimeout & setInterval clear variables  **/
let timer;
let deleteFirstPhotoDelay;


/**
 * Fetch Breed List from the Dog.ceo API
 */
async function start() {
  try {
    const response =  await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch(err) {
    console.log("There was a problem fetching the breed list.")
  }
}
/*
fetch("https://dog.ceo/api/breeds/list/all")
.then(response => response.json())
.then(data => console.log(data));
*/

start();


/**
 * Creating Breed List Function
 */
function createBreedList(breedList) {
  document.querySelector('#breed').innerHTML = 
    `<select onchange="loadByBreed(this.value)">
        <option>Choose a Dog Breed</option>
        ${Object.keys(breedList).map( breed => `<option> ${breed} </option>`)
                                .join('')
        }
      </select>`;
}



/**
 * Loading Breed Images fetching api data
 */
async function loadByBreed(breed) {
 if(breed != "Choose a Dog Breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images
    `);
    const data = await response.json();
    console.log(data);
    createSlideShow(data.message);
 }
}



/**
 * Creating Slideshow function
 */
function createSlideShow(images) {
  let currentPosition = 0;

  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if(images.length > 1) {    
    document.querySelector('#slideshow').innerHTML = 
    `<div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>`;
  
    currentPosition += 2;
    if(images.length === 2) {
      currentPosition = 0;
    }
    timer = setInterval(nextSlide, 3000);
  } else {    
    document.querySelector('#slideshow').innerHTML = 
    `<div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>`;
  }
  
  /**  Next Slide Function  **/
  function nextSlide() {
    document.querySelector('#slideshow')
            .insertAdjacentHTML("beforeend", `  
                                  <div class="slide" style="background-image: url('${images[currentPosition]}')"></div>
                                `);
    
    deleteFirstPhotoDelay = setTimeout(() => {
      document.querySelector('.slide').remove();
    }, 1000);

    if(currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } 
    currentPosition++; // same as currentPosition + 1; 
  }
}










