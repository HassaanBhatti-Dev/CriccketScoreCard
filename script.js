// Getting the score from the InputScore element
const score = document.getElementById("InputScore").innerText;

// Inserting the score into the "score" div
document.getElementById("score").innerHTML = `${score }`;
const inputScore = document.getElementById("InputScore");
const scoreDiv = document.getElementById("score");

scoreDiv.innerHTML=Number(0)
// When pressing Enter inside the input
inputScore.addEventListener("keypress", function(event) {
    console.log("Key is Pressed");
    console.log("Value --> ",inputScore.value)
    
  if (event.key === "Enter") {
    if(Number(inputScore.value)<7)
      {
    const value = Number(inputScore.value);   // get typed score
    scoreDiv.innerHTML =Number(scoreDiv.innerHTML)+ Number(value);       // display it in #score after adding the previous score
    inputScore.value = "";   // clear input after enter     
  }    
  else {
    alert(`Can not add ${Number(inputScore.value)}`)
  }}
});