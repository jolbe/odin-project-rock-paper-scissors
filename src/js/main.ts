import { getRequiredElement } from "./utils";

/*** Game logic ***/
let humanScore = 0;
let computerScore = 0;
const GAME_OVER_AT = 5;

const CHOICES = ["rock", "paper", "scissors"] as const;
type Choice = (typeof CHOICES)[number];

function isChoice(value: string): value is Choice {
  return CHOICES.includes(value as Choice);
}

function getRandomChoice(): Choice {
  const rand = Math.floor(Math.random() * 3);

  return CHOICES[rand];
}

const WINS_AGAINST: Record<Choice, Choice> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getWinner(
  humanChoice: Choice,
  computerChoice: Choice,
): "human" | "computer" | "draw" {
  if (humanChoice === computerChoice) return "draw";
  if (WINS_AGAINST[humanChoice] == computerChoice) return "human";
  return "computer";
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type RoundResult = {
  result: "Win" | "Lose" | "Draw";
  msg: string;
  details: string;
};

function playRound(humanChoice: Choice, computerChoice: Choice): RoundResult {
  const winner = getWinner(humanChoice, computerChoice);

  switch (winner) {
    case "human":
      humanScore++;
      return {
        result: "Win",
        msg: "You win!",
        details: `${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`,
      };
    case "computer":
      computerScore++;
      return {
        result: "Lose",
        msg: "You lose!",
        details: `${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`,
      };
    default:
      return {
        result: "Draw",
        msg: "It's a draw!",
        details: `${capitalizeFirstLetter(humanChoice)} ties with ${computerChoice}`,
      };
  }
}

/*** UI logic ***/
// Define all the interactive elements
const elements = {
  controls: {
    buttons: document.querySelectorAll(".controls button"),
  },
  scores: {
    player: getRequiredElement(".scores .human"),
    computer: getRequiredElement(".scores .computer"),
  },
  round: {
    info: getRequiredElement(".scoreboard > h2"),
    explanation: getRequiredElement(".scoreboard > p"),
  },
};

// Add an event listener to the buttons that call your playRound function
// with the correct playerSelection every time a button is clicked
elements.controls.buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Don't allow to keep playing on finished game
    if (isGameOver()) {
      showPlayAgainModal();
      return;
    }

    const playerSelection = getValidValue(e.target as HTMLButtonElement);
    const computerSelection = getRandomChoice();

    const roundResult = playRound(playerSelection, computerSelection);

    // Update the UI
    updateScoreboard(roundResult, playerSelection, computerSelection);

    // After every round we need to check if game is over
    if (isGameOver()) {
      showPlayAgainModal();
    }
  });
});

function getValidValue(target: HTMLButtonElement): Choice {
  const value = target.value;
  if (!isChoice(value)) throw new Error(`Invalid choice: ${value}`);
  return value;
}

function updateScoreboard(
  result: RoundResult,
  playerSelection: Choice,
  computerSelection: Choice,
) {
  // update selections
  updateSign(elements.scores.player, playerSelection);
  updateScore(elements.scores.player, humanScore);
  updateSign(elements.scores.computer, computerSelection);
  updateScore(elements.scores.computer, computerScore);
  elements.round.info.textContent = result.msg;
  elements.round.explanation.textContent = result.details;
}

function updateSign(element: HTMLElement, selection: string) {
  let sign = element.querySelector(".sign");
  if (sign != null) {
    sign.textContent = getEmoji(selection);
  }
}

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

function updateScore(element: HTMLElement, score: number) {
  const scoreElem = element.querySelector(".score");
  if (scoreElem != null) {
    scoreElem.textContent = String(score);
  }
}

function isGameOver() {
  return humanScore >= GAME_OVER_AT || computerScore >= GAME_OVER_AT;
}
function showPlayAgainModal() {
  console.log("let's see if it gets updated");
  // alert("Game over!\nPlay again?");
}
function handleGameOver() {
  alert("show dialog");
}
