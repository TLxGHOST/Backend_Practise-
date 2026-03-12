
document.querySelector("button").addEventListener("click",runningTheGame);

function runningTheGame(){
var random1=Math.floor(Math.random()*6)+1;
var random2=Math.floor(Math.random()*6)+1;
var link="./images/dice"+random1+".png";
var link2="./images/dice"+random2+".png";


document.querySelector("img").setAttribute("src",link);
document.querySelector(".dice2").setAttribute("src",link2);

var x;
if(random1>random2){
  document.querySelector(".winner").textContent="Player 1 wins 🚩";
}
else if(random1<random2)
  document.querySelector(".winner").textContent="Player 2 wins 🚩";
else
  document.querySelector(".winner").textContent="Its A tie 🥲";
}