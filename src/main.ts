const CHOICES = ["rock", "paper", "scissors"] as const;
type Choice = (typeof CHOICES)[number];

function getRandomChoice(): Choice {
  const rand = Math.floor(Math.random() * 3);

  return CHOICES[rand];
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let humanScore = 0;
let computerScore = 0;

type Winner = "Human" | "Computer" | "Draw";
function playRound(humanChoice: Choice, computerChoice: Choice): Winner {
  // Check for draws
  if (humanChoice === computerChoice) {
    console.log("It's a draw!");
    return "Draw";
  }
  // Check if human wins
  else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    // const winningMsg = `You win! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`;
    // console.log(winningMsg);
    humanScore++;
    return {
      result: "Human",
      msg: "You win!",
      details: `${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`,
    };
    // return "Human";
  }
  // Computer won
  else {
    const losingMsg = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`;
    console.log(losingMsg);
    computerScore++;
    return "Computer";
  }
}

// Define all the interactive elements
const scoreboard = {
  msg: document.querySelector(".scoreboard h2"),
};
// Grab all the buttons
const btns = document.querySelectorAll(".controls button");

const player = {
  element: document.querySelector(".scores .human") as HTMLElement,
  score: 0,
};
const computer = {
  element: document.querySelector(".scores .computer") as HTMLElement,
  score: 0,
};

// Add an event listener to the buttons that call your playRound function
// with the correct playerSelection every time a button is clicked
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const playerSelection = e.target?.value;
    const computerSelection = getRandomChoice();

    const winner = playRound(playerSelection, computerSelection);

    // Update the UI
    // TODO: could refactor all this smaller UI updates into an umbrella updateScoreboard
    setSelection(player.element, playerSelection);
    setSelection(computer.element, computerSelection);
    updateScoreboard(winner, playerSelection, computerSelection);
    updateScore(player.element, humanScore);
    updateScore(computer.element, computerScore);

    // Check if game over. Currently set at 5 rounds
    // TODO:
  });
});

function getEmoji(selection: string): string {
  const EMOJI_MAP: Record<Choice, string> = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️",
  };

  if (selection in EMOJI_MAP) {
    return EMOJI_MAP[selection as Choice];
  }

  return "";
}

function setSelection(element: HTMLElement, selection: string) {
  let sign = element.querySelector(".sign");
  if (sign != null) {
    sign.textContent = getEmoji(selection);
  }
}

function updateScoreboard(
  winner: Winner,
  playerChoice: Choice,
  computerChoice: Choice,
) {
  const roundInfo: HTMLElement = document.querySelector(".scoreboard > h2");
  const roundExplaination: HTMLElement =
    document.querySelector(".scoreboard > p");

  const msg =
    winner === "Draw"
      ? "It's a draw!"
      : winner === "Human"
        ? "You won!"
        : "You lost!";

  const explanation =
    winner === "Draw"
      ? `${capitalizeFirstLetter(playerChoice)} ties with ${computerChoice}`
      : winner === "Human"
        ? `${capitalizeFirstLetter(playerChoice)} beats ${computerChoice}`
        : `${capitalizeFirstLetter(playerChoice)} is beaten by ${computerChoice}`;

  roundInfo.textContent = msg;
  roundExplaination.textContent = explanation;
}

function updateScore(element: HTMLElement, score: number) {
  const scoreElem = element.querySelector(".score");
  if (scoreElem != null) {
    scoreElem.textContent = score;
  }
}
