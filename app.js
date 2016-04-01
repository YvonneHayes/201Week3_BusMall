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

    var nShow = characterArray[i].nShow;
    var p = 0;
    if (nShow) {p = Math.floor((characterArray[i].nClicks/characterArray[i].nShow)*100);}
    percentArray.push(p);
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

//adding MobMerge variables
var voteMore = false;
var Charts = false;
var storageObjectOne;

//variables to set clicksChart and percentChart to be global in scope
var clicksChartGlobal;
var percentChartGlobal;

//hides reset button
resetButton.setAttribute('style','visibility:hidden');



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
      clicksChartGlobal.destroy(); //Destroying the chart before showing it again to avoid having 2 layers of it
      percentChartGlobal.destroy();
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

// Contructor to make Storage Objects

function makeStorageObject() {
  this.totalClicks = 0;
  this.nClicksAll = [];
  this.nShow = [];
  this.percentAll = [];
  this.ImagesShown = []; // 2d array
  this.voteMore = false;
  this.Charts = false;
  this.processClick = true;
}

/*
===========
FUNCTIONS
===========
*/

// Functions to fill Storage Objects

var storeClicks = function() {

  storageObjectOne.totalClicks = totalClicks;

  // get nClicks from all Image Objects
  var nClicksAllArray = [];
  for (var i = 0; i < characterArray.length; i++) {
    nClicksAllArray.push(characterArray[i].nClicks);
  }
  storageObjectOne.nClicksAll = nClicksAllArray;

// get nShown from all Image Objects
  var nShowAllArray = [];
  for (var i = 0; i < characterArray.length; i++) {
    nShowAllArray.push(characterArray[i].nShow);
  }
  storageObjectOne.nClicksAll = nClicksAllArray;

  // get percentages from all Image Objects
    for (var i = 0; i < characterArray.length; i++) {
      var percentAllArray = [];
      var nShow = characterArray[i].nShow;
      var p = 0;
      if (nShow) {p = Math.floor((characterArray[i].nClicks/characterArray[i].nShow)*100);}
      percentAllArray.push(p);
    }

    storageObjectOne.percentAll = percentAllArray;

    // get attribute on images shown
    var setOfThree = [];
    setOfThree.push(imageOne.getAttribute('src'));
    setOfThree.push(imageTwo.getAttribute('src'));
    setOfThree.push(imageThree.getAttribute('src'));
    storageObjectOne.ImagesShown.push(setOfThree);

    //check if voteMore button has been clicked

    if (voteMore) {
      storageObjectOne.voteMore = true;
    };

// check if processClick is true/false
    if (processClick) {
      storageObjectOne.processClick = true;
    } else {
      storageObjectOne.processClick = false;
    }

// check if clicksChartGlobal object exists
    if (typeof clicksChartGlobal !== 'undefined') {
      storageObjectOne.Charts = true;
    }
} //storeClicks Function Closed

//making a function that pushes storage Object into a local storage

var storageIn = function (objectName) {
  localStorage.setItem("storageObjectOne",JSON.stringify(objectName));
}

//making function that gets storage object out of local storage

var storageOut = function (objectName) {
  var pullStorage = localStorage.getItem(objectName);
  var parseData = JSON.parse(pullStorage);
  return parseData;
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
} // Closed newVoteRound function

// making a function that checks local storage upon each click

var checkStorage = function (){

  // restores last state if there is a history
  if (localStorage.getItem('storageObjectOne')) {      //checks if storageObjectOne is in local storage
      var parsedStorage = storageOut("storageObjectOne");

        totalClicks = parsedStorage.totalClicks; // refills global variable totalClicks array
        percentArray = parsedStorage.percentAll; // refills global variable percent array
        processClick = parsedStorage.processClick; // resets global variable processClick - is needed for imageClicked function!!!

        //restore image slots
        imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][0]);
        imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][1]);
        imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][2]);

      for (var i = 0; i < characterArray.length; i++) {

        characterArray[i].nClicks = parsedStorage.nClicks[i];
        characterArray[i].nShow = parsedStorage.nShow[i];
      }

      if (totalClicks > 16) {
        if (parsedStorage.Charts = true){
          showResults();
        }

      } else if (totalClicks == 24) {
        showResults();

      }

    } else {
    var storageObjectOne = new makeStorageObject(); // storageObjectOne is a global variable!!!!!!!
    storageIn(storageObjectOne);
    }//Main if Close
} // checkStorage Close

checkStorage(); // this checks at the beginning of everything or reload if there is an object in loal Storage



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
