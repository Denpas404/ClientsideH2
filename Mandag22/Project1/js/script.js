const clock = document.getElementById('clock');
function clockTime() {
    clock.innerHTML = new Date().toLocaleTimeString();
};
setInterval(clockTime, 1000);

//Game:

const gameBoard = document.querySelector(".gameboard");


let playerXTurn = true
let playerOne = document.getElementById("playerOne");
let playerTwo = document.getElementById("playerTwo");
let playerOneScore = 0;
let playerTwoScore = 0;

const createEvt = (fields) => {
    fields.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.innerHTML == "") {
                e.target.innerHTML = playerXTurn ? "X" : "O";
                setTimeout(() => {
                if (isWinner()){
                     alert("Vinderen er: " + (playerXTurn ? "X" : "O"));
                        if (playerXTurn) {
                            playerOneScore++;
                            playerOne.innerHTML = playerOneScore;
                        } 
                        else {
                            playerTwoScore++;
                            playerTwo.innerHTML = playerTwoScore;                            
                        }
                       return; 
                }}, 100); 
                
                playerXTurn = !playerXTurn;
            }
        });
    });
};
const isWinner = () => {

    for (let row = 0; row < 3; row++) {
        if (document.querySelector(`#r${row}c0`).innerHTML ===
            document.querySelector(`#r${row}c1`).innerHTML &&
            document.querySelector(`#r${row}c0`).innerHTML ===
            document.querySelector(`#r${row}c2`).innerHTML &&
            document.querySelector(`#r${row}c0`).innerHTML !== "")
            return true;
    }
    for (let col = 0; col < 3; col++) {
        if (document.querySelector(`#r0c${col}`).innerHTML ===
            document.querySelector(`#r1c${col}`).innerHTML &&
            document.querySelector(`#r0c${col}`).innerHTML ===
            document.querySelector(`#r2c${col}`).innerHTML &&
            document.querySelector(`#r0c${col}`).innerHTML !== "")
            return true;
    }

    if (document.querySelector("#r0c0").innerHTML ===
        document.querySelector("#r1c1").innerHTML &&
        document.querySelector("#r0c0").innerHTML ===
        document.querySelector("#r2c2").innerHTML &&
        document.querySelector("#r0c0").innerHTML !== "")
        return true;

    if (document.querySelector("#r0c2").innerHTML ===
        document.querySelector("#r1c1").innerHTML &&
        document.querySelector("#r0c2").innerHTML ===
        document.querySelector("#r2c0").innerHTML &&
        document.querySelector("#r0c2").innerHTML !== "")
        return true;
};

const init = () => {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let btn = document.createElement("button");
            btn.className = "field";
            btn.id = `r${row}c${col}`;
            gameBoard.appendChild(btn);
        }
    }
    const fields = document.querySelectorAll(".field");
    createEvt(fields);
};

init();

const resetbtn = document.getElementById("reset");
resetbtn.addEventListener("click", () => {
  const fields = document.querySelectorAll(".field");
  fields.forEach((btn) => {
    btn.innerHTML = ""; // Clear the content of each button
  });
  playerXTurn = true; // Reset the player turn to X
});



// fetch('https://api.publicapis.org/entries')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not OK');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Handle the data returned from the API
//         const apiList = document.getElementById('apiList');
//         for (let i = 0; i < data.entries.length; i++) {
//             const listItem = document.createElement("li");
//             listItem.textContent = data.entries[i].API;
//             apiList.appendChild(listItem);
//         }

//     })
//     .catch(error => {
//         // Handle any errors that occurred during the request
//         console.error('Error:', error);
//     });
