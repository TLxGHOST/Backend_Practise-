var file_path="./sounds/"
var audio=new Audio(file_path+"crash"+".mp3");
var lengthtemp=document.querySelectorAll(".drum").length;
for (var i=0;i<lengthtemp;i++){
    document.querySelectorAll(".drum")[i].addEventListener("mouseover",function(){playSound(this.textContent);});
}
document.addEventListener("keydown",function(e){playSound(e.key);})


function playSound(k){
  
  switch(k) {
    case "w":
      document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/tom-1.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);

      break;
      case "a":
        document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/tom-2.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);
      break;
      case "s":
        document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/tom-3.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);
      break;
      case "d":
        document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/tom-4.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);
      break;
      case "j":
        document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/snare.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);
      break;
      case "k":
        document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/crash.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);
      break;
      case "l":
        document.querySelector("."+k).classList.toggle("pressed");
      audio = new Audio("./sounds/kick-bass.mp3");
      audio.play();
      setTimeout(function(){      document.querySelector("."+k).classList.toggle("pressed");
},100);
      break;
      
      
  }
}