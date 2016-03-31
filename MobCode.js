
// Contructor to make Storage Objects

function makeStorageObject(round) {
  this.round = round;
  this.totalClicks = 0;
  this.nClicksAll = [];
  this.nShowAll = [];
  this.ImagesShown = []; // 2d array
  this.voteMore = true;
  this.Charts = true
}

var storageObjectOne = new makeStorageObject(1);

// Functions to fill Storage Objects

var clickStore = function() {

  storageObjectOne.totalClicks = totalClicks;

  // get nClicks from all Image Objects
  var nClicksAllArray = [];
  for (var i = 0; i < catArray.length; i++) {
    nClicksAllArray.push(catArray[i].nClicks);
  }
  storageObjectOne.nClicksAll = nClicksAllArray;

}
