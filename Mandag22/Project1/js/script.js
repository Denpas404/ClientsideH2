const clock = document.getElementById('clock');
function clockTime() {
    clock.innerHTML = new Date().toLocaleTimeString();
};
setInterval(clockTime, 1000);

const gameBoard = document.querySelector(".gameboard");
gameBoard.addEventListener("click", function(e) {
    alert("You clicked on the gameboard")
});