
var voteMore = false;
var Charts = false;
var storageObjectOne;

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


// Functions to fill Storage Objects

var storeClicks = function() {

  storageObjectOne.totalClicks = totalClicks;

  // get nClicks from all Image Objects
  var nClicksAllArray = [];
  for (var i = 0; i < catArray.length; i++) {
    nClicksAllArray.push(catArray[i].nClicks);
  }
  storageObjectOne.nClicksAll = nClicksAllArray;

// get nShown from all Image Objects
  var nShowAllArray = [];
  for (var i = 0; i < catArray.length; i++) {
    nShowAllArray.push(catArray[i].nShow);
  }
  storageObjectOne.nClicksAll = nClicksAllArray;

  // get percentages from all Image Objects
    for (var i = 0; i < catArray.length; i++) {
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

// check if clicksChart object exists
    if (typeOf clicksChart !== 'undefined') {
      storageObjectOne.Charts = true;
    }
} //storeClicks Function Closed

//making a function that pushes storage Object into a local storage

var storageIn = function () {
  localStorage.setItem("storageObjectOne", JSON.stringify(storageObjectOne));
}

//making function that gets storage object out of local storage

var storageOut = function (objectName) {
  var pullStorage = localStorage.getItem(objectName);
  var parseData = JSON.parse(pullStorage);
  return parseData;
}






// making a function that checks local storage upon each click

var checkStorage = function (){

  // restores last state if there is a history
  if (localStorage.getItem('storageObjectOne') {      //checks if storageObjectOne is in local storage
      var parsedStorage = storageOut();

        totalClicks = parsedStorage.totalClicks; // refills global variable totalClicks array
        percentArray = parsedStorage.percentAll; // refills global variable percent array
        processClick = parsedStorage.processClick; // resets global variable processClick - is needed for imageClicked function!!!

        //restore image slots
        imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][0]);
        imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][1]);
        imageOne.setAttribute('src', parsedStorage.ImagesShown[totalClicks][2]);

      for (var i = 0; i < catArray.length; i++) {

        catArray[i].nClicks = parsedStorage.nClicks[i];
        catArray[i].nShow = parsedStorage.nShow[i];
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
