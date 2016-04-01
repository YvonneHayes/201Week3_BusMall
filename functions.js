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

    // storeClicks();

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

var storageIn = function () {
  localStorage.setItem("storageObjectOne",JSON.stringify(storageObjectOne));
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
        // imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][0]);
        // imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][1]);
        // imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][2]);

      for (var i = 0; i < characterArray.length; i++) {

        characterArray[i].nClicks = parsedStorage.nClicksAll[i];
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
    storageObjectOne = new makeStorageObject(); // storageObjectOne is a global variable!!!!!!!
    storageIn();
    }//Main if Close
} // checkStorage Close

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
