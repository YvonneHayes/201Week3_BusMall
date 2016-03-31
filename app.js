/*
=============
canvas charts
=============
*/

//+++++++++++++
//array to store labels for chart
var labelArray = [];

//++++++++++
//array to store Yaxis or clicks numbers for chart
var yAxisArray = [];

//++++++++++++++++
//array to store yaxis or percent click per show rate
var percentArray = [];

//function for chart's labels

var makeBarLabels = function() {
  for (var i = 0; i < characterArray.length; i++) {
    labelArray[i] = characterArray[i].name;
  }

}

//function for chart's y axis or number of clicks
var makeYAxis = function() {
  for (var i = 0; i < characterArray.length; i++) {
    yAxisArray[i] = characterArray[i].nClicks;
  }
}

//++++++++++++++++++++
//adding separate
var makePercentChart = function() {
  for (var i = 0; i < characterArray.length; i++) {

    var x = Math.floor((characterArray[i].nClicks/characterArray[i].nShow)*100);

    percentArray.push(x);
  }
}


//function to show results
//moved showResults function from function section
function showResults() {
  //++++++++starting

  makePercentChart();
  barDataPercent.datasets[0].data = percentArray;

  makeBarLabels();
  barData.labels = labelArray;
  barDataPercent.labels = labelArray;
  makeYAxis();
  barData.datasets[0].data = yAxisArray;

  displayButton.setAttribute('style','visibility:hidden');
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //placed invocation of bar chart within showResults function
  var clicksChart = document.getElementById("clicksChart").getContext("2d");
  //+++++++++++++++++++++++++
  //asssigning new chart to global variable so we can call destroy method on it
  clicksChartGlobal = new Chart(clicksChart).Bar(barData);
  clicksChart = clicksChartGlobal;


  //chart variable for barDataPercent
  var percentChart = document.getElementById("percentChart").getContext("2d");
  percentChartGlobal = new Chart(percentChart).Bar(barDataPercent);
  percentChart = percentChartGlobal;

}

var barData = {
	labels : [], //these are our image titles or this.name
	datasets : [
		{
			fillColor : "rgba(73,188,170,0.4)",
			strokeColor : "rgba(72,174,209,0.4)",
			data : [] // clicks
		}
	]
}

var barDataPercent = {
  labels : [], //these are our image titles or this.name
  datasets : [
    {
      fillColor : "rgba(73,188,170,0.4)",
      strokeColor : "rgba(72,174,209,0.4)",
      data : [] // clicks
    }
  ]
}


/*
=========
variables
=========
*/

/* ++++++
specific images set to variables and collect the id from DOM
*/
var imageOne = document.getElementById('characterPic1');
var imageTwo = document.getElementById('characterPic2');
var imageThree = document.getElementById('characterPic3');

var displayButton = document.getElementById('myButton');
var voteMoreButton = document.getElementById('voteMore');
var resetButton = document.getElementById('resetButton');

var chart = document.getElementById('chart');

var characterArray = [];

var totalClicks = 0;

var processClick = true;

var clicks = 16;

var x = true;

//variables to set clicksChart and percentChart to be global in scope
var clicksChartGlobal;
var percentChartGlobal;

//hides reset button
resetButton.setAttribute('style','visibility:hidden');

// /* ++++++  NOT USING RIGHT NOW BUT KEEPING IN CASE WANT LATER ++++++
// variables for paragraph elements to be added per
// image and add paragraph elements within html
// */
// var paraOne = document.getElementById('paraOne');
// var paraTwo = document.getElementById('paraTwo');
// var paraThree = document.getElementById('paraThree');
// var paraFour = document.getElementById('paraFour');
//



// /*
// ===============
// arrays
// ===============
// */

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
calling the showRandomImg function with specific images here
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
    }
  }
}


function imageClicked() {
  if (processClick) {
    totalClicks++;


    showRandomImg(imageOne);
    showRandomImg(imageTwo);
    showRandomImg(imageThree);

    if (totalClicks >= clicks && x && totalClicks < 24) {
      //code to display hidden button
      displayButton.setAttribute('style','visibility:visible');
      voteMoreButton.setAttribute('style','visibility:visible');
      processClick = false;
      //+++++++++++++++++++++++++++
      //added in else statement here
    } else if (totalClicks === 24) {
      x = false;
      voteMoreButton.setAttribute('style', 'visibility:hidden');
      processClick = false;
      // voteMoreButton <-- remove event listener here
      voteMoreButton.removeEventListener('click', eightMore);
      resetButton.setAttribute('style','visibility:visible');
      showResults();
    }
  }
}

/*
===========
constructor
===========
*/

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


  //replacing image function
  var n = randomImageIndex();
  image.setAttribute("src", characterArray[n].path);
  characterArray[n].nShow++;
}

//function to implement vote more button disappearing after clicking and allow for an additional 8 clicks
function eightMore() {
  clicks = 24;
  processClick = true;
  voteMoreButton.setAttribute('style','visibility:hidden');
  displayButton.setAttribute('style','visibility:hidden');
  displayButton.removeEventListener('click', showResults);
}

function newVoteRound() {

  //hides reset button
  resetButton.setAttribute('style','visibility:hidden');
  
  //destroys charts
  clicksChartGlobal.destroy();
  percentChartGlobal.destroy();

  //resets all global variables
  totalClicks = 0;
  console.log(totalClicks);
  processClick = true;
  clicks = 16;
  x = true;
  console.log(clicks);
  clicksChartGlobal = 0;
  percentChartGlobal = 0;

  //resets all image object's counters
  for (var i = 0; i < characterArray.length; i++) {
    characterArray[i].nClicks = 0;
    characterArray[i].nShow = 0;
  }



  //repopulate image spaces
  showRandomImg(imageOne);
  showRandomImg(imageTwo);
  showRandomImg(imageThree);

  //rest chart data objects
  barData.labels = [];
  barDataPercent.labels = [];

  //add back in eventListeners
  displayButton.addEventListener('click', showResults);
  voteMoreButton.addEventListener('click', eightMore);
}




// Paragraphs that are now not needed anymore but I'd like to keep for now in case I
// decide to do something with them later

//   para1.textContent = "Link, Hero of Hyrule, Master of the Triforce has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para2.textContent = "Mario, the Plumber and Savior of Princesses has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para3.textContent = "Sonic the Hedgehog, Collector of golden Rings has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para4.textContent = "Geralt of Riviera, all-around bad A** has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para5.textContent = "Lara Croft, Raider of Tombs has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para6.textContent = "Commander Shepard of the Normandy, Savior of the Galaxy has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para7.textContent = "Assassin, Mr. multiple Personalities has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//   para8.textContent = "Donkey Kong, Kidnapper of Princesses has shown up " + characterArray[0].nShow + " times and has been voted for " + characterArray[0].nClicks + " times!"
//
//


/*
===============
event listeners
===============
*/


imageOne.addEventListener("click", imageClicked);
imageTwo.addEventListener("click", imageClicked);
imageThree.addEventListener("click", imageClicked);

displayButton.addEventListener("click", showResults);

//adding eventListener for vote more button
voteMoreButton.addEventListener("click", eightMore);

resetButton.addEventListener("click", newVoteRound);
