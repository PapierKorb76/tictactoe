const TicTacToeCells = document.querySelectorAll(".tic-tac-toe-cell");
const Player1TextBox = document.querySelector("#player-1-textbox");
const Player2TextBox = document.querySelector("#player-2-textbox");
const startBtn = document.querySelector("#start-btn");

startBtn.addEventListener("click", () => {
  console.log(Player1TextBox.value);
  console.log(Player2TextBox.value);
  startBtn.style.display = "none";     
  Player1TextBox.style.display = "none";
  Player2TextBox.style.display = "none";
})


//Color of the Tiles
TicTacToeCells.forEach(cell => {
  cell.textContent === "X" ?
    cell.style.color = "#A52A2A" :
    cell.style.color = "#0E278D";
})
