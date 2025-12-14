// Getting the score from the InputScore element
const score = document.getElementById("InputScore").innerText;

// Inserting the score into the "score" div
document.getElementById("score").innerHTML = `${score }`;
const inputScore = document.getElementById("InputScore");
const scoreDiv = document.getElementById("score");

// Variables will be used for adding Extras
let isNoball = false;
let isWideball  = false;

// Function to set isNoBall to true 
function setNoBall(){  
  isNoball=true
}

// Function to set isWideBall to true 
function setWideBall(){
  isWideball= true
}

scoreDiv.innerHTML=Number(0)
// When pressing Enter inside the input
inputScore.addEventListener("keypress", function(event) {
    
  if (event.key === "Enter") {
    if(Number(inputScore.value)<7)
      {
    const value = Number(inputScore.value);   // get typed score
    let extraScore =0

    if(isNoball || isWideball){
      extraScore=1
    }

    scoreDiv.innerHTML =Number(scoreDiv.innerHTML)+ Number(value)+Number(extraScore);       // display it in #score after adding the previous score
    inputScore.value = "";   // clear input after enter  
    isNoball=false           // set default value
    isWideball=false         // set default value
  }    
  else {
    alert(`Can not add ${Number(inputScore.value)}`)
  }}
});