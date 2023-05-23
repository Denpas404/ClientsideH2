const clock = document.getElementById('clock');
function clockTime() {
    clock.innerHTML = new Date().toLocaleTimeString();
};
setInterval(clockTime, 1000);

//Game:

const gameBoard = document.querySelector(".gameboard");

let playerXTurn = true; // Angiver om det er spiller X's tur
let currentPlayer = "X"; // Den aktuelle spiller
let playerOne = document.getElementById("playerOne"); // Spiller 1 element
let playerTwo = document.getElementById("playerTwo"); // Spiller 2 element
let playerOneScore = 0; // Spiller 1 score
let playerTwoScore = 0; // Spiller 2 score
let moves = 0; // Tæller for antal træk


const createEvt = (fields) => {    
    fields.forEach((btn) => {     // Itererer gennem hvert felt
        btn.addEventListener("click", (e) => { // "Hændelseslytter" for klik begivenheden på en knap

            if (e.target.innerHTML === "") {
                const currentPlayer = playerXTurn ? "X" : "O";
                e.target.innerHTML = currentPlayer;
                
                moves++; // Øger antallet af træk med 1

                setTimeout(() => {
                    if (isWinner()) {
                        alert("Vinderen er: " + currentPlayer);
                        if (currentPlayer === "X") {
                            playerOneScore++;
                            playerOne.innerHTML = playerOneScore;
                        } else {
                            playerTwoScore++;
                            playerTwo.innerHTML = playerTwoScore;
                        }
                        
                        return;                        
                    }
                    else if (moves === 9) {
                        alert("Uafgjort");
                        return;
                    }
                }, 100);
                
                playerXTurn = !playerXTurn; // Skifter til den næste spillers tur
            }
        });
    });
};

const isWinner = () => {
    // Tjekker hver række for en vinder
    for (let row = 0; row < 3; row++) {
        if (document.querySelector(`#r${row}c0`).innerHTML ===
            document.querySelector(`#r${row}c1`).innerHTML &&
            document.querySelector(`#r${row}c0`).innerHTML ===
            document.querySelector(`#r${row}c2`).innerHTML &&
            document.querySelector(`#r${row}c0`).innerHTML !== "")
            return true;
    }
    // Tjekker hver kolonne for en vinder
    for (let col = 0; col < 3; col++) {
        if (document.querySelector(`#r0c${col}`).innerHTML ===
            document.querySelector(`#r1c${col}`).innerHTML &&
            document.querySelector(`#r0c${col}`).innerHTML ===
            document.querySelector(`#r2c${col}`).innerHTML &&
            document.querySelector(`#r0c${col}`).innerHTML !== "")
            return true;
    }
    // Tjekker diagonalen fra øverste venstre hjørne til nederste højre hjørne
    if (document.querySelector("#r0c0").innerHTML ===
        document.querySelector("#r1c1").innerHTML &&
        document.querySelector("#r0c0").innerHTML ===
        document.querySelector("#r2c2").innerHTML &&
        document.querySelector("#r0c0").innerHTML !== "")
        return true;
    // Tjekker diagonalen fra øverste højre hjørne til nederste venstre hjørne
    if (document.querySelector("#r0c2").innerHTML ===
        document.querySelector("#r1c1").innerHTML &&
        document.querySelector("#r0c2").innerHTML ===
        document.querySelector("#r2c0").innerHTML &&
        document.querySelector("#r0c2").innerHTML !== "")
        return true;
    
    // Returnerer false hvis der ikke er en vinder
    return false;
};

const init = () => {
    // Genererer knapperne til spillepladen
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let btn = document.createElement("button");
            btn.className = "field";
            btn.id = `r${row}c${col}`;
            gameBoard.appendChild(btn);
        }
    }
    // Henter alle felterne (knapperne) på spillepladen
    const fields = document.querySelectorAll(".field");
    // Opretter hændelseslyttere for knapperne
    createEvt(fields);
};

// Initialiserer spillet ved at kalde init-funktionen
init();

const resetbtn = document.getElementById("reset");
resetbtn.addEventListener("click", () => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((btn) => {
        btn.innerHTML = ""; // Rydder indholdet af hvert felt
    });
    playerXTurn = true; // Nulstiller spillerens tur til X
    moves = 0; // Nulstiller antallet af træk til 0
    playerOneScore = 0; // Nulstiller spiller 1's score til 0
    playerTwoScore = 0; // Nulstiller spiller 2's score til 0
    playerOne.innerHTML = playerOneScore; // Opdaterer spiller 1's score
    playerTwo.innerHTML = playerTwoScore; // Opdaterer spiller 2's score
});

const newGameBtn = document.getElementById("startNewGame");
newGameBtn.addEventListener("click", () => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((btn) => {
        btn.innerHTML = ""; // Rydder indholdet af hvert felt
    });
    playerXTurn = true; // Nulstiller spillerens tur til X
    moves = 0; // Nulstiller antallet af træk til 0
});


