

const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start the game when a key is pressed
document.addEventListener("keydown", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Handle button clicks from user
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Generate the next sequence for the game
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  
  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  
  flashButton(randomColor);
  playSound(randomColor);
}

// Check if the user's input is correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
    
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);
    
    startOver();
  }
}

// Flash the button corresponding to the color
function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

// Play sound for each button color
function playSound(name) {
  const audio = new Audio(getSoundFile(name));
  audio.play();
}

// Return sound file URL for the color
function getSoundFile(color) {
  switch (color) {
    case "green":
      return "https://www.soundjay.com/button/beep-07.wav";
    case "red":
      return "https://www.soundjay.com/button/beep-08b.wav";
    case "yellow":
      return "https://www.soundjay.com/button/beep-09.wav";
    case "blue":
      return "https://www.soundjay.com/button/beep-10.wav";
    case "wrong":
      return "https://www.soundjay.com/button/beep-01a.wav";
    default:
      return "";
  }
}

// Animate button press (blink effect)
function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 100);
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  document.getElementById("level-title").textContent = "Press A Key to Start";
}
