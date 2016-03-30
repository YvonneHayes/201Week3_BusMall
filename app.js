/*
=========
variables
=========
*/

// var catDiv = document.getElementById('catsOnCats');

/* ++++++
specific images set to variables and collect the id from DOM
*/
var imageOne = document.getElementById('characterPic1');
var imageTwo = document.getElementById('characterPic2');
var imageThree = document.getElementById('characterPic3');

var displayButton = document.getElementById('myButton');
var voteMoreButton = document.getElementById('voteMore');
var chart = document.getElementById('chart');

var characterArray = [];

var totalClicks = 0;

var processClick = true;

/*
variables capturing the paragraph slots
for textContent addition on show results
*/

/* ++++++
variables for paragraph elements to be added per
image and add paragraph elements within html
*/
var paraOne = document.getElementById('paraOne');
var paraTwo = document.getElementById('paraTwo');
var paraThree = document.getElementById('paraThree');
var paraFour = document.getElementById('paraFour');

/*
===============
arrays
===============
*/

/* +++++++
make a new object here per image added
*/
characterArray[0] = new makeImageObj("Link", "img/Link.jpg");
characterArray[1] = new makeImageObj("Mario", "img/Mario.jpg");
characterArray[2] = new makeImageObj("Sonic", "img/sonic.png");
characterArray[3] = new makeImageObj("Geralt", "img/Geralt.jpg");
characterArray[4] = new makeImageObj("Lara", "img/LaraCroft.png");
characterArray[5] = new makeImageObj("Shepard", "img/CommanderShepard.png");
characterArray[6] = new makeImageObj("Assassin", "img/Assassin.jpg");
characterArray[7] = new makeImageObj("Donkey", "img/Donkey.jpeg");

/*
================
calling functions
================
*/

/* ++++++++
calling the showRandomImg function with specific images here. Will need
to ammend additional images
*/
showRandomImg(imageOne);
showRandomImg(imageTwo);
showRandomImg(imageThree);


/*
=========
functions
=========
*/

/* +++++++++
function to count the number of clicks on imageOne specifically
*/
imageOne.onclick = function() {
  var srcValue = imageOne.getAttribute('src');

  for (var i = 0; i < characterArray.length; i++) {
    if (srcValue == characterArray[i].path) {
      characterArray[i].nClicks++;
      // console.log(characterArray[i].path + " #$% " +characterArray[i].nClicks);
    }
  }
}

//function to count the number of clicks on imageTwo specifically
imageTwo.onclick = function() {
  var srcValue = imageTwo.getAttribute('src');

  for (var i = 0; i < characterArray.length; i++) {
    if (srcValue == characterArray[i].path) {
      characterArray[i].nClicks++;
      console.log(characterArray[i].path + " #$% " +characterArray[i].nClicks);
    }
  }
}

//function to count the number of clicks on imageThree specifically
imageThree.onclick = function() {
  var srcValue = imageThree.getAttribute('src');

  for (var i = 0; i < characterArray.length; i++) {
    if (srcValue == characterArray[i].path) {
      characterArray[i].nClicks++;
      console.log(characterArray[i].path + " #$% " +characterArray[i].nClicks);
    }
  }
}

//
function imageClicked() {
  if (processClick) {
    totalClicks++;

    //for each addition image add in code to call the image here:
    showRandomImg(imageOne);
    showRandomImg(imageTwo);
    showRandomImg(imageThree);

    if (totalClicks >= 16) {
      //code to display hidden button
      displayButton.setAttribute('style','visibility:visible');
      voteMoreButton.setAttribute('style','visibility:visible');
      processClick = false;
    }
  }
}

//constructor function to make new image objects
function makeImageObj(name, path) {
  this.name = name;
  this.path = path;
  this.nShow = 0;
  this.nClicks = 0;
}

/*
random number generation to go through amount of images within
constructors
*/
function randomImageIndex() {
  var result = Math.floor(Math.random() * (characterArray.length));
  return result;
}

//function to display random image from list
function showRandomImg(image) {
  // var clickCount = newImage.getAttribute("src");
  // console.log(clickCount);


  //replacing image function
  var n = randomImageIndex();
  image.setAttribute("src", characterArray[n].path);
  characterArray[n].nShow++;
}



//function to show results
function showResults() {

  //add in paraNum.textContent per paragraph element position within HTML DOM

  para1.textContent = "Link, Hero of Hyrule, Master of the Triforce has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para2.textContent = "Mario, the Plumber and Savior of Princesses has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para3.textContent = "Sonic the Hedgehog, Collector of golden Rings has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para4.textContent = "Geralt of Riviera, all-around bad A** has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para5.textContent = "Lara Croft, Raider of Tombs has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para6.textContent = "Commander Shepard of the Normandy, Savior of the Galaxy has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para7.textContent = "Assassin, Mr. multiple Personalities has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
  para8.textContent = "Donkey Kong, Kidnapper of Princesses has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
}

var imageOneCounter = 0;

/*
===============
event listeners
===============
*/

/*++++++
addin eventListener per imageNUMBER variables set at the top of the js file
*/
imageOne.addEventListener("click", imageClicked);
imageTwo.addEventListener("click", imageClicked);
imageThree.addEventListener("click", imageClicked);

displayButton.addEventListener("click", showResults);
