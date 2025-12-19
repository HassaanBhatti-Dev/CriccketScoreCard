// Getting the score from the InputScore element
const score = document.getElementById("InputScore").innerText;
document.getElementById("score").innerHTML = `${score}`;
const inputScore = document.getElementById("InputScore");
const scoreDiv = document.getElementById("score");
const widebtn = document.getElementById("widebtn");
const noBallbtn = document.getElementById("noBallbtn");
const overMapperDiv = document.getElementById("currentOverRunsDisplay");

let fairBall = 0;
let undoStack = [];
// Variables will be used for adding Extras
let isNoball = false;
let isWideball = false;

// Function to set isNoBall to true
function setNoBall() {
  // ✅ Now no ball is active
  isNoball = true;
  noBallbtn.classList.add("active");
  // ❌through this wide ball is Inactive
  isWideball = false;
  widebtn.classList.remove("active");
}
// Function to set isWideBall to true
function setWideBall() {
  // Acivating Wide Ball Button
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
      let extraScoreText = "";

      if (!isWideball && !isNoball) {
        fairBall += 1;
      }

      if (isWideball) {
        extraScore = 1;
        widebtn.classList.remove("active");
        extraScoreText = "(WD)";
        isWideball = false; // set default value
      }

      if (isNoball) {
        extraScore = 1;
        noBallbtn.classList.remove("active");
        extraScoreText = "(NB)";
        isNoball = false; // set default value
      }

      scoreDiv.innerHTML = Number(scoreDiv.innerHTML) + Number(value) + Number(extraScore); // display it in #score after adding the previous score
      undoStack.push(Number(value) + Number(extraScore)); // pushing the new score to undo stack
      currentBallRuns = `${Number(value)}${extraScoreText}`; // pushing the new score to current over runs
      inputScore.value = ""; // clear input after enter
      const isOverFinished = fairBall === 6;

      renderButtons(isOverFinished, currentBallRuns); // render buttons for current over
    } else {
      alert(`Can not add ${Number(inputScore.value)}`)
    }
  }
});

// Function to undo last added score
function undoLastScore() {
  const lastScoreAdded = undoStack.pop(); // removing last score from stack

  if (lastScoreAdded !== undefined) {
    const currentScore = Number(scoreDiv.innerHTML);

    const newScore = currentScore - lastScoreAdded;
    scoreDiv.innerHTML = newScore;
    overMapperDiv.removeChild(overMapperDiv.lastChild); // removing last button from current over display
    fairBall -= 1; // reducing fair ball count by 1
  }
}

// Whenever score updates, this function will be called to render buttons 
function renderButtons(isOverFinished, value) {
  // Clear previous content
  if (isOverFinished) {
    setTimeout(() => {
      overMapperDiv.innerHTML = "";
    }, 2000);
    return;
  }

  let button = document.createElement("button");
  button.classList.add("over-run-map-button");
  let span = document.createElement("span");
  span.textContent = value; // put the value inside span
  button.appendChild(span); // put span inside button
  overMapperDiv.appendChild(button); // add button to the div

}