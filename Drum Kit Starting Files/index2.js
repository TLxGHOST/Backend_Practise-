var soundMap = {
  "w": "./sounds/tom-1.mp3",
  "a": "./sounds/tom-2.mp3",
  "s": "./sounds/tom-3.mp3",
  "d": "./sounds/tom-4.mp3",
  "j": "./sounds/snare.mp3",
  "k": "./sounds/crash.mp3",
  "l": "./sounds/kick-bass.mp3"
};

$(".drum").on("mouseover", function() {
  
  playSound($(this).text());
});

$(document).on("keydown", function(e) {
  playSound(e.key);
});

function playSound(k) {
  if (!soundMap[k]) return;
  
  var $element = $("." + k);
  $element.addClass("pressed");
  
  new Audio(soundMap[k]).play();
  
  setTimeout(function() {
    $element.removeClass("pressed");
  }, 100);
}