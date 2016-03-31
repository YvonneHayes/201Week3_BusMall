
var voteMore = false;
var Charts = false;

// Contructor to make Storage Objects

function makeStorageObject(round) {
  this.round = round;
  this.totalClicks = 0;
  this.nClicksAll = [];
  this.percentAll = [];
  this.ImagesShown = []; // 2d array
  this.voteMore = false;
  this.Charts = false;
}

var storageObjectOne = new makeStorageObject(1);

// Functions to fill Storage Objects

var storeClicks = function() {

  storageObjectOne.totalClicks = totalClicks;

  // get nClicks from all Image Objects
  var nClicksAllArray = [];
  for (var i = 0; i < catArray.length; i++) {
    nClicksAllArray.push(catArray[i].nClicks);
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

// check if clicksChart object exists
    if (typeOf clicksChart !== 'undefined') {
      storageObjectOne.Charts = true;
    }
}

//making a function that pushes storage Object into a local storage

var storageIn = function (objectName) {
  localStorage.setItem(JSON.stringify(objectName));
}

//making function that gets storage object out of local storage

var storageOut = function (objectName) {
  var pullStorage = localStorage.getItem(JSON.parse(objectName));
  return pullStorage;
}
