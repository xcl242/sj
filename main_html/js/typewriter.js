/* Credit to https://jayhoffmann.com/how-to-make-text-that-writes-itself-in-javascript/ */
/* Inspiration from https://www.smurfitkappa.com/ */

var caSearchObj = {
  searchContainer : document.querySelector('.ca-search-input-container'),
  inputField : document.getElementById('ca-search-input'),
  pieces : ['This very long text could be added', 'in the backend of a WordPress site'],
  span : document.getElementById('ca-typewriter-here'),
  message : document.getElementById('ca-typewriter-here').innerHTML,
  piece : '',
  mode : 'write',
  delay : 800,
  i : -1
}

function updateText(txt) {
    caSearchObj.span.innerHTML = txt;
}

function tick () {
  if(caSearchObj.message.length === 0) {
    caSearchObj.i++;
    caSearchObj.piece = caSearchObj.pieces[caSearchObj.i];
    caSearchObj.message = '';
    caSearchObj.mode = 'write';
  }
  switch(caSearchObj.mode) {
    case 'write' :
      caSearchObj.message += caSearchObj.piece.slice(0, 1);
      caSearchObj.piece = caSearchObj.piece.substr(1);
      updateText(caSearchObj.message);
      if(caSearchObj.piece.length === 0 && caSearchObj.i === (caSearchObj.pieces.length - 1)) {
          // Add this code if you want the animation to run indefinately
          caSearchObj.piece = '';
          caSearchObj.i = -1;
          // Add this code if you want the animation to stop when it reaches the last item in the array
          // window.clearTimeout(timeout);
          // return;
      }
      if(caSearchObj.piece.length === 0){
          caSearchObj.mode = 'delete';
          // This dictates the wait at the end before the text starts deleting.
          caSearchObj.delay = 1000;
      } else {
          // This dictates the rate at which the text writes
          caSearchObj.delay = 50;
      }
      break;
      
    case 'delete' :
      caSearchObj.message = caSearchObj.message.slice(0, -1);
      updateText(caSearchObj.message);
      if(caSearchObj.message.length === 0) {
        caSearchObj.mode = 'write';
        // This dictates the wait in between deleted text and starting to write new text
        caSearchObj.delay = 500;
      } else {
        // This dictates the rate at which the text deletes
        caSearchObj.delay = 60;
      }
      break;  
  } // End of switch statement
  timeout = window.setTimeout(tick, caSearchObj.delay);
} // End of the tick function
let timeout = window.setTimeout(tick, caSearchObj.delay);

document.querySelector('.ca-search-form-container').addEventListener('click', () => {
  // Stop the function running
  window.clearTimeout(timeout);
  
  // Place input field in view
  caSearchObj.inputField.classList.add('ca-replace-input-field');
  
  // Focus on input element
  caSearchObj.inputField.focus();
});