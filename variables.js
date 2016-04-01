//+++++++++++++
//array to store labels for chart
var labelArray = [];

//++++++++++
//array to store Yaxis or clicks numbers for chart
var yAxisArray = [];

//++++++++++++++++
//array to store yaxis or percent click per show rate
var percentArray = [];

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






// OBJECTS
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
