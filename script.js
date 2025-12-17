// Getting the score from the InputScore element
const score = document.getElementById("InputScore").innerText;

// Inserting the score into the "score" div
document.getElementById("score").innerHTML = `${score}`;
const inputScore = document.getElementById("InputScore");
const scoreDiv = document.getElementById("score");
const widebtn = document.getElementById("widebtn");
const noBallbtn = document.getElementById("noBallbtn");

// Variables will be used for adding Extras
let isNoball = false;
let isWideball  = false;

// Function to set isNoBall to true
function setNoBall(){
  isNoball=true;
  noBallbtn.classList.add("active");
  // 🔹 counter reset
  inputCountAfternoBall = 0;
}
// Function to set isWideBall to true
function setWideBall(){
  isWideball= true;

 widebtn.classList.add("active");
  // 🔹 counter reset
  inputCountAfterWide = 0;
}

scoreDiv.innerHTML = Number(0);
// When pressing Enter inside the input
inputScore.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    if(Number(inputScore.value) < 7){
      const value = Number(inputScore.value); // get typed score
      let extraScore = 0;

      if (isWideball && inputCountAfterWide === 0) {
        extraScore += 1;
      }

      if (isNoball && inputCountAfternoBall === 0) {
        extraScore += 1;
      }

      if (isWideball) {
        inputCountAfterWide++;
        // ❗ doosri baar input par wide reset
        if (inputCountAfterWide === 2) {
          widebtn.classList.remove("active");
          isWideball = false; // set default value
          inputCountAfterWide = 0;
        }
      }

      if (isNoball) {
        inputCountAfternoBall++;
        // ❗ doosri baar input par noBall reset
        if (inputCountAfternoBall === 2) {
          noBallbtn.classList.remove("active");
          isNoball = false; // set default value
          inputCountAfternoBall = 0;
        }
      }

scoreDiv.innerHTML =Number(scoreDiv.innerHTML) + Number(value) + Number(extraScore); // display it in #score after adding the previous score
      inputScore.value = ""; // clear input after enter
    } else {
      alert(`Can not add ${Number(inputScore.value)}`)
    }
  }
});
