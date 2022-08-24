const TicTacToeCells = document.querySelectorAll(".tic-tac-toe-cell");

//Color of the Tiles
TicTacToeCells.forEach(cell => {
  cell.textContent === "X" ? 
  cell.style.color = "#A52A2A" : 
  cell.style.color = "#0E278D";
})
