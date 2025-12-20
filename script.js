// Getting the score from the InputScore element
const score = document.getElementById("InputScore").innerText;
document.getElementById("score").innerHTML = `${score}`;
const inputScore = document.getElementById("InputScore");
const scoreDiv = document.getElementById("score");
const widebtn = document.getElementById("widebtn");
const noBallbtn = document.getElementById("noBallbtn");
const overMapperDiv = document.getElementById("currentOverRuns");

let resetTimeoutId; // declare globally or in a higher scope
let fairBall = 0;
let attemptedBalls = 0
let undoStack = [];
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
      let extraScoreText = "";
      let isFairBall = false;
      if (!isWideball && !isNoball) {
        fairBall += 1;
        isFairBall = true;
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
      undoStack.push({ score: Number(value) + Number(extraScore), isFairBall }); // pushing the new score to undo stack
      currentBallRuns = `${Number(value)}${extraScoreText}`; // pushing the new score to current over runs
      inputScore.value = ""; // clear input after enter
      const isOverFinished = fairBall === 6;
      attemptedBalls += 1;

      renderButtons(isOverFinished, currentBallRuns); // render buttons for current over
    } else {
      alert(`Can not add ${inputScore.value}`)
    }
  }
});

// Function to undo last added score
function undoLastScore() {
  const lastScoreAdded = undoStack.pop(); // removing last score from stack
  const scoreSpans = document.querySelectorAll(".score-per-ball");
  const isOverMapEmpty = Array.from(scoreSpans).every(
    element => element.textContent.trim() === ''
  );

  if (!isOverMapEmpty) {

    if (fairBall === 0) {
      fairBall = 6; // if over was finished, set fair ball to 6
      clearTimeout(resetTimeoutId); // clear timeout if over was finished
    }

    if (lastScoreAdded !== undefined) {
      const currentScore = Number(scoreDiv.innerHTML);
      const newScore = currentScore - lastScoreAdded.score;
      scoreDiv.innerHTML = newScore;
      scoreSpans[attemptedBalls - 1].textContent = '';

      if (lastScoreAdded.isFairBall && fairBall > 0) {
        fairBall -= 1; // reducing fair ball count by 1
      }
      attemptedBalls -= 1; // reducing attempted balls by 1
    }
  } else {
    alert("No more actions to undo");
  }
}

// Whenever score updates, this function will be called to render buttons 
function renderButtons(isOverFinished, value) {

  // Select all spans with class "score-per-ball"
  const scoreSpans = document.querySelectorAll(".score-per-ball");
  scoreSpans[attemptedBalls - 1].textContent = value;
  const lastScoreAdded = undoStack[undoStack.length - 1];

  if (lastScoreAdded.isFairBall === false) {

    const spanWrapper = document.createElement("span");
    spanWrapper.classList.add("currentOverRunsDisplay");
    spanWrapper.classList.add("remove-after-over-finishes");

    let button = document.createElement("button");
    button.classList.add("over-run-map-button");

    let span = document.createElement("span");
    span.classList.add("score-per-ball")

    span.textContent = ''; // put the value inside span
    button.appendChild(span);
    spanWrapper.appendChild(button);

    // Append to the container
    overMapperDiv.appendChild(spanWrapper);
  }

  if (isOverFinished) {
    fairBall = 0; // reset fair ball count for new over
    const spansToRemove = document.querySelectorAll(".remove-after-over-finishes");
    // Loop through and assign values
    resetTimeoutId = setTimeout(() => {
      scoreSpans.forEach((run, index) => {
        attemptedBalls = 0;

        if (scoreSpans[index]) {
          scoreSpans[index].textContent = '';
          spansToRemove.forEach(span => span.remove());

        }
      });
    }, 2000);
  }
}