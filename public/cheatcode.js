// a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};  
  
var cheatCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var cheatCodePosition = 0;
  
document.addEventListener('keydown', function(e) {
  var key = allowedKeys[e.keyCode];
  var requiredKey = cheatCode[cheatCodePosition];  

  if (key == requiredKey) {  
  
    cheatCodePosition++;    
    if (cheatCodePosition == cheatCode.length) {
      activateCheats();
      cheatCodePosition = 0;
    }
  } else {
    cheatCodePosition = 0;
  }
});
  
function activateCheats() {
 
  alert("CONTRA CODE ACTIVATED");
  var audio = new Audio('icons/cheat.mp3');
  audio.play();
}