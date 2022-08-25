const TicTacToeCells = document.querySelectorAll(".tic-tac-toe-cell");
const Player1TextBox = document.querySelector("#player-1-textbox");
const Player2TextBox = document.querySelector("#player-2-textbox");
const startBtn = document.querySelector("#start-btn");
const gameDisplayer = document.querySelector("#game-displayer");
const invisibleDiv = document.querySelector("#invisible-div");
let gameEnded = false;

let TicTacToe = [
  ' ', ' ', ' ',
  ' ', ' ', ' ',
  ' ', ' ', ' '
];


var nextTurn = 'X';

invisibleDiv.style.display = "none";

function PlayerFactory(name, sign) {
  const getName = () => {
    return name.toString();
  };
  const getSign = () => {
    return sign.toString();
  };

  return {
    getName,
    getSign
  };
}

let Player1 = {};
let Player2 = {};


function displayName() {
  Player1 = PlayerFactory(Player1TextBox.value.toString(), "X");
  Player2 = PlayerFactory(Player2TextBox.value.toString(), "O");
  gameController(Player1, Player2, TicTacToe);
  Player1TextBox.style.display = "none";
  Player2TextBox.style.display = "none";
  startBtn.style.display = "none";
}
startBtn.addEventListener("click", displayName);

function changeTurn() {
  let Player1State = gameChecker(TicTacToe, Player1.getSign(), Player1.getName())[gameChecker(TicTacToe, Player1.getSign(), Player1.getName()).length - 1];
  let Player2State = gameChecker(TicTacToe, Player2.getSign(), Player2.getName())[gameChecker(TicTacToe, Player2.getSign(), Player2.getName()).length - 1];

  if (nextTurn === "O") {
    nextTurn = "X";
    gameDisplayer.innerText = `${Player1.getName()}, è il tuo turno`;
  } else {
    nextTurn = "O";
    gameDisplayer.innerText = `${Player2.getName()}, è il tuo turno`;
  }
  if (Player1State === "!") {
    gameDisplayer.innerText = `${Player1.getName()}, hai vinto!`;
    gameEnded = true;
    invisibleDiv.style.display = "block";
  } else if (Player2State === "!") {
    gameDisplayer.innerText = `${Player2.getName()}, hai vinto!`;
    gameEnded = true;
    invisibleDiv.style.display = "block";
  } else if (isTicTacToeFull(TicTacToe) && Player1State !== "!" && Player2State !== "!") {
    gameDisplayer.innerText = `Pareggio!`;
    gameEnded = true;
    invisibleDiv.style.display = "block";
  }
}

function PlayerAction(player) {
  gameDisplayer.innerText = `${Player1.getName()}, è il tuo turno`
  TicTacToeCells.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.innerText === "") {
        TicTacToe[(Number(cell.id[cell.id.length - 1]))] = nextTurn;
        changeTurn();
      }
      TicTacToeBuilder(TicTacToe);
    });
  });

}


function colorTiles() {
  TicTacToeCells.forEach(cell => {
    cell.textContent === "X" ?
      cell.style.color = "#A52A2A" :
      cell.style.color = "#0E278D";
  });
}

function TicTacToeBuilder(TicTacToe) {
  for (let i = 0; i < TicTacToe.length; i++) {
    TicTacToeCells[i].textContent = TicTacToe[i];
  }
  colorTiles();
}


function gameController(Player1, Player2, TicTacToe) {
  let Player1State = gameChecker(TicTacToe, Player1.getSign(), Player1.getName())[gameChecker(TicTacToe, Player1.getSign(), Player1.getName()).length - 1];
  let Player2State = gameChecker(TicTacToe, Player2.getSign(), Player2.getName())[gameChecker(TicTacToe, Player2.getSign(), Player2.getName()).length - 1];
  if (Player1State === "." && Player2State === "." && !isTicTacToeFull(TicTacToe) &&
    (Player1.getName() !== "" || Player2.getName() !== "")) {
    if (nextTurn === "X") {
      PlayerAction(Player1);
    } else {
      PlayerAction(Player2);
    }
  }

}

function gameChecker(TicTacToe, sign, name) {
  for (let i = 0; i < TicTacToe.length; i++) {
    if (
      (TicTacToe[0] === sign && TicTacToe[1] === sign && TicTacToe[2] === sign) ||
      (TicTacToe[3] === sign && TicTacToe[4] === sign && TicTacToe[5] === sign) ||
      (TicTacToe[6] === sign && TicTacToe[7] === sign && TicTacToe[8] === sign) ||
      (TicTacToe[0] === sign && TicTacToe[3] === sign && TicTacToe[6] === sign) ||
      (TicTacToe[1] === sign && TicTacToe[4] === sign && TicTacToe[7] === sign) ||
      (TicTacToe[2] === sign && TicTacToe[5] === sign && TicTacToe[8] === sign) ||
      (TicTacToe[0] === sign && TicTacToe[4] === sign && TicTacToe[8] === sign) ||
      (TicTacToe[2] === sign && TicTacToe[4] === sign && TicTacToe[6] === sign)
    ) {
      return `${name} hai vinto!`;
    } else {
      return `${name} hai perso...`;
    }
  }

}

function isTicTacToeFull(TicTacToe) {
  return TicTacToe.indexOf(" ") === -1 ? true : false;
}
