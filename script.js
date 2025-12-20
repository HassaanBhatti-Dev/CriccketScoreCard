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
let isWideball = false;

// Function to set isNoBall to true
function setNoBall() {
  const toggleNoBallButton = noBallbtn.classList.contains("active");

  if (toggleNoBallButton) {
    //  toggle No ball to Inactive
    isNoball = false;
    noBallbtn.classList.remove("active");

    return;
  }
  //  Now no ball is active
  isNoball = true;
  noBallbtn.classList.add("active");
  // through this wide ball is Inactive
  isWideball = false;
  widebtn.classList.remove("active");
}
// Function to set isWideBall to true
function setWideBall() {
  const toggleWideBallButton = widebtn.classList.contains("active");

  if (toggleWideBallButton) {
    //  toggle wide ball to Inactive
    isWideball = false;
    widebtn.classList.remove("active");

    return;
  }
  // Activating Wide Ball Button
  isWideball = true;
  widebtn.classList.add("active");

  // ❌ through this no ball is Inactive
  isNoball = false;
  noBallbtn.classList.remove("active");
}

scoreDiv.innerHTML = Number(0);
// When pressing Enter inside the input
inputScore.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (Number(inputScore.value) < 7) {
      const value = Number(inputScore.value); // get typed score
      let extraScore = 0;

      if (isWideball) {
        extraScore = 1;
        widebtn.classList.remove("active");
        isWideball = false; // set default value
      }

      if (isNoball) {
        extraScore = 1;
        noBallbtn.classList.remove("active");
        isNoball = false; // set default value
      }

      scoreDiv.innerHTML = Number(scoreDiv.innerHTML) + Number(value) + Number(extraScore); // display it in #score after adding the previous score
      inputScore.value = ""; // clear input after enter
    } else {
      alert(`Can not add ${Number(inputScore.value)}`)
    }
  }
});
