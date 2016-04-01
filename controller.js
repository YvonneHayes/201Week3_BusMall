//hides reset button
resetButton.setAttribute('style','visibility:hidden');

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

checkStorage(); // this checks at the beginning of everything or reload if there is an object in loal Storage
