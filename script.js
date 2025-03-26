document.addEventListener("DOMContentLoaded", function () {
  const rulesContainer = document.querySelector(".game-rules");
  const rulesButton = document.querySelector(".ruleButton");
  const closeButton = document.querySelector(".cross");

  if (rulesContainer && rulesButton && closeButton) {
    rulesContainer.style.display = "none";
    closeButton.style.display = "none";

    rulesButton.addEventListener("click", function () {
      rulesButton.classList.add("clicked");
      setTimeout(() => {
        rulesButton.classList.remove("clicked");
      }, 300);

      closeButton.style.display = "block";
      rulesContainer.style.display = "flex";

      rulesContainer.classList.remove("fadeOut");
      closeButton.classList.remove("fadeOut");

      rulesContainer.classList.add("fadeIn");
      closeButton.classList.add("fadeIn");
    });

    closeButton.addEventListener("click", function () {
      rulesContainer.classList.remove("fadeIn");
      closeButton.classList.remove("fadeIn");

      rulesContainer.classList.add("fadeOut");
      closeButton.classList.add("fadeOut");

      setTimeout(() => {
        rulesContainer.style.display = "none";
        closeButton.style.display = "none";

        rulesContainer.classList.remove("fadeOut");
        closeButton.classList.remove("fadeOut");
      }, 300);
    });
  } else {
    console.warn("Rules UI elements not found.");
  }

  const inputButtons = document.querySelectorAll(".rock, .scissor, .paper");
  const inputState = document.querySelector(".input-diagram");
  const resultState = document.querySelector(".result");
  const playAgain = document.querySelector(".play-again");
  const scoreCard = document.querySelector(".scoreCard");
  const selectInput = document.querySelector(".selectInput");
  const celebration = document.querySelector(".celebration");
  const celebration_play_again_button = document.querySelector(
    ".celebration .play-agian-button button"
  );

  let yourScore = parseInt(localStorage.getItem("yourScore")) || 0;
  let pcScore = parseInt(localStorage.getItem("pcScore")) || 0;

  const youScore = document.querySelector(".your-score-value");
  const pcScoreDisplay = document.querySelector(".cs-score-value");

  youScore.textContent = yourScore;
  pcScoreDisplay.textContent = pcScore;

  const inputEmoji = {
    rock: { sign: "✊🏿", color: "blue" },
    paper: { sign: "🤚🏿", color: "orange" },
    scissor: { sign: "✌🏿️", color: "purple" },
  };

  const keys = Object.keys(inputEmoji);

  function PCInput() {
    const randomNumber = Math.floor(Math.random() * 3);
    return randomNumber;
  }

  function findWinner(you, pc) {
    if (you === pc) {
      return "TIE UP";
    }

    if (
      (you === "rock" && pc === "scissor") ||
      (you === "paper" && pc === "rock") ||
      (you === "scissor" && pc === "paper")
    ) {
      yourScore++;
      localStorage.setItem("yourScore", yourScore);
      return "YOU WIN";
    }

    pcScore++;
    localStorage.setItem("pcScore", pcScore);
    return "YOU LOST";
  }

  // Updated showWinningEffect with winner parameter
  function showWinningEffect(winner) {
    const winningCircle = document.querySelector(
      `.result .picked:nth-child(${winner === "you" ? 1 : 3}) .circle`
    );

    if (winningCircle) {
      winningCircle.classList.add("winner");

      setTimeout(() => {
        winningCircle.classList.remove("winner");
      }, 2000);
    }
  }

  if (inputButtons.length > 0 && inputState && resultState) {
    function showResult(event) {
      inputState.style.display = "none";
      resultState.style.display = "flex";

      const selectedClass = event.currentTarget.classList[0];
      const ourSelectedSign = inputEmoji[selectedClass]?.sign;

      const pcSelectedClass = keys[PCInput()];
      const pcSelectedSign = inputEmoji[pcSelectedClass].sign;
      const pcColor = inputEmoji[pcSelectedClass].color;

      const ourSelectedInput = document.querySelector(
        ".result .picked .circle button"
      );
      const pcSelectedInput = document.querySelector(
        ".result .picked:nth-child(3) .circle button"
      );

      ourSelectedInput.textContent = ourSelectedSign;
      ourSelectedInput.style.borderColor = inputEmoji[selectedClass]?.color;

      pcSelectedInput.textContent = pcSelectedSign;
      pcSelectedInput.style.borderColor = pcColor;

      const resultSlogan = document.querySelector(".result .conclusion p");
      resultSlogan.textContent = findWinner(selectedClass, pcSelectedClass);

      if (resultSlogan.textContent === "YOU WIN") {
        showWinningEffect("you");

        setTimeout(() => {
          scoreCard.style.display = "none";
          selectInput.style.display = "none";
        }, 1000);
        celebration.style.display = "flex";

        celebration_play_again_button.addEventListener("click", function () {
          celebration_play_again_button.classList.add("clicked");
          setTimeout(() => {
            celebration_play_again_button.classList.remove("clicked");
          }, 300);
          scoreCard.style.display = "flex";
          selectInput.style.display = "flex";
          resultState.style.display = "none";
          inputState.style.display = "block";
          celebration.style.display = "none";
        });
      } else if (resultSlogan.textContent === "YOU LOST") {
        showWinningEffect("pc");
      }

      youScore.textContent = yourScore;
      pcScoreDisplay.textContent = pcScore;
    }

    inputButtons.forEach((button) => {
      button.addEventListener("click", showResult);
    });

    playAgain.addEventListener("click", function () {
      playAgain.classList.add("clicked");
      setTimeout(() => {
        playAgain.classList.remove("clicked");
      }, 300);
      inputState.style.display = "block";
      resultState.style.display = "none";
    });
  } else {
    console.warn("Game UI elements not found.");
  }
});
