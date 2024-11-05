const startButton = document.getElementById("start");
const gameButton = document.getElementById("game-button");
const resultDisplay = document.getElementById("result");
const highScoreDisplay = document.getElementById("high-score");
const messageDisplay = document.getElementById("message");
const difficultySelect = document.getElementById("difficulty");

let startTime, reactionTime, highScore;
const messages = [
  "Nice reaction!",
  "You’re fast!",
  "Quick reflexes!",
  "Almost pro level!",
  "Lightning speed!",
];

startButton.addEventListener("click", startGame);

function startGame() {
  messageDisplay.textContent = "";
  resultDisplay.textContent = "";
  startButton.classList.add("hidden");
  gameButton.classList.add("hidden");

  // Set random background color
  document.body.style.backgroundColor = getRandomColor();

  // Determine delay based on difficulty
  let delay;
  const difficulty = difficultySelect.value;
  if (difficulty === "easy") delay = Math.random() * 3000 + 2000; // 2-5 sec
  else if (difficulty === "medium") delay = Math.random() * 2000 + 1000; // 1-3 sec
  else delay = Math.random() * 1000 + 500; // 0.5-1.5 sec for hard

  setTimeout(() => {
    placeGameButtonRandomly();
    startTime = Date.now();
    gameButton.classList.remove("hidden");
    gameButton.addEventListener("click", calculateReaction);
  }, delay);
}

function calculateReaction() {
  reactionTime = Date.now() - startTime;
  resultDisplay.textContent = `Your reaction time is ${reactionTime} ms!`;

  // Update high score if needed
  if (!highScore || reactionTime < highScore) {
    highScore = reactionTime;
    highScoreDisplay.textContent = `High Score: ${highScore} ms`;
  }

  // Display a random encouraging message
  messageDisplay.textContent = messages[Math.floor(Math.random() * messages.length)];

  resetGame();
}

function resetGame() {
  gameButton.classList.add("hidden");
  startButton.classList.remove("hidden");
  gameButton.removeEventListener("click", calculateReaction);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function placeGameButtonRandomly() {
  const buttonWidth = gameButton.offsetWidth;
  const buttonHeight = gameButton.offsetHeight;
  const maxX = window.innerWidth - buttonWidth;
  const maxY = window.innerHeight - buttonHeight;

  // Generate random coordinates within the viewport bounds
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  // Apply the random position to the button
  gameButton.style.position = "absolute";
  gameButton.style.left = `${randomX}px`;
  gameButton.style.top = `${randomY}px`;
}
