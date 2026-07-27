// Load saved score
let wins = Number(localStorage.getItem("wins")) || 0;
let losses = Number(localStorage.getItem("losses")) || 0;
let ties = Number(localStorage.getItem("ties")) || 0;

// Show saved score
updateScore();

function getComputerChoice() {

    let random = Math.random() * 3;

    if (random < 1) {
        return "Stone";
    }
    else if (random < 2) {
        return "Paper";
    }
    else {
        return "Scissors";
    }

}

// Return emoji
function getEmoji(choice) {

    if (choice === "Stone")
        return "🪨";

    if (choice === "Paper")
        return "📄";

    return "✂️";

}

// Sleep function
function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

// Main Game Function
async function playGame(playerChoice) {

    const playerHand = document.getElementById("playerHand");
    const computerHand = document.getElementById("computerHand");
    const countdown = document.getElementById("countdown");
    const resultBox = document.getElementById("result");

    // Disable buttons during animation
    document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = true);

    resultBox.innerHTML = "";

    // Show fists
    playerHand.innerHTML = "✊";
    computerHand.innerHTML = "✊";

    // Start shaking
    playerHand.classList.add("shake");
    computerHand.classList.add("shake");

    // Countdown
    countdown.innerHTML = "3";
    await sleep(1000);

    countdown.innerHTML = "2";
    await sleep(1000);

    countdown.innerHTML = "1";
    await sleep(1000);

    countdown.innerHTML = "GO!";
    await sleep(600);

    countdown.innerHTML = "";

    // Stop shaking
    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    // Reveal choices
    const computerChoice = getComputerChoice();

    playerHand.innerHTML = getEmoji(playerChoice);
    computerHand.innerHTML = getEmoji(computerChoice);

    // Decide winner
    let result = "";

    if (playerChoice === computerChoice) {

        result = "🤝 It's a Tie!";
        ties++;

    }
    else if (

        (playerChoice === "Stone" && computerChoice === "Scissors") ||

        (playerChoice === "Paper" && computerChoice === "Stone") ||

        (playerChoice === "Scissors" && computerChoice === "Paper")

    ) {

        result = "🎉 You Win!";
        wins++;

    }
    else {

        result = "😢 You Lose!";
        losses++;

    }

    // Save score
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
    localStorage.setItem("ties", ties);

    updateScore();

    // Show result
    resultBox.innerHTML = `
        <h2>${result}</h2>

        <p><strong>You:</strong> ${playerChoice} ${getEmoji(playerChoice)}</p>

        <p><strong>Computer:</strong> ${computerChoice} ${getEmoji(computerChoice)}</p>
    `;

    // Enable buttons again
    document.querySelectorAll(".buttons button").forEach(btn => btn.disabled = false);

}

// Update Scoreboard
function updateScore() {

    document.getElementById("win").textContent = wins;
    document.getElementById("lose").textContent = losses;
    document.getElementById("tie").textContent = ties;

}

// Reset Score
document.getElementById("resetBtn").addEventListener("click", function () {

    wins = 0;
    losses = 0;
    ties = 0;

    localStorage.setItem("wins", 0);
    localStorage.setItem("losses", 0);
    localStorage.setItem("ties", 0);

    updateScore();

    document.getElementById("playerHand").innerHTML = "❔";
    document.getElementById("computerHand").innerHTML = "❔";

    document.getElementById("countdown").innerHTML = "";

    document.getElementById("result").innerHTML = "Choose your move!";

});

// Dark Mode
document.getElementById("darkBtn").addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        this.innerHTML = "☀️ Light Mode";

    } else {

        this.innerHTML = "🌙 Dark Mode";

    }

});