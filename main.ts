const CHOICES = ["rock", "paper", "scissors"] as const;
type Choice = (typeof CHOICES)[number];

function getComputerChoice(): Choice {
  const rand = Math.floor(Math.random() * 3);

  return CHOICES[rand];
}

function getHumanChoice(): Choice {
  let userChoice: string | null = null;

  while (!CHOICES.includes(userChoice as Choice)) {
    userChoice = prompt("Enter rock, paper or scissors")?.toLowerCase() ?? "";
  }

  return userChoice as Choice;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function playGame(rounds: number = 5) {
  let humanScore = 0;
  let computerScore = 0;

  function showCurrentScore() {
    console.log(`Human: ${humanScore} vs computer: ${computerScore}`);
    console.log("-".repeat(35));
  }

  function playRound(humanChoice: Choice, computerChoice: Choice) {
    // Check for draws
    if (humanChoice === computerChoice) {
      console.log("It's a draw!");
    }
    // Check if human wins
    else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      const winningMsg = `You win! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`;
      console.log(winningMsg);
      humanScore++;
    }
    // Computer won
    else {
      const losingMsg = `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`;
      console.log(losingMsg);
      computerScore++;
    }
  }

  // Play till human or computer first gets to 5 or number of rounds passed as a paramater
  while (humanScore < rounds && computerScore < rounds) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);
    showCurrentScore();
  }

  // Print the winner
  if (humanScore > computerScore) {
    console.log(`Human won ${humanScore} to ${computerScore}`);
  } else if (computerScore > humanScore) {
    console.log(`Computer beat you ${computerScore} to ${humanScore}`);
  }
}

// Start the game
playGame(3);
