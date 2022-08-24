const TicTacToeCells = document.querySelectorAll(".tic-tac-toe-cell");
const Player1TextBox = document.querySelector("#player-1-textbox");
const Player2TextBox = document.querySelector("#player-2-textbox");
const startBtn = document.querySelector("#start-btn");
const gameDisplayer = document.querySelector("#game-displayer");

let TicTacToe = [
  ' ', ' ', ' ',
  ' ', ' ', ' ',
  ' ', ' ', ' '
];


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


function PlayerAction(player) {
  gameDisplayer.innerHTML = `${player.getName()}, è il tuo turno!`;
  TicTacToeCells.forEach(cell => {
    cell.addEventListener("click", () => {
      TicTacToe[(Number(cell.id[cell.id.length - 1]))] = player.getSign();
      TicTacToeBuilder(TicTacToe);
      console.log(TicTacToe);
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


  while (Player1State === "." && Player2State === "." && !isTicTacToeFull(TicTacToe) &&
    (Player1.getName() !== "" || Player2.getName() !== "")) {
    for (let i = 0; i < 3; i++) {
      PlayerAction(Player1);
      PlayerAction(Player2);
    }
    break;
  }

  /*
  	console.log(Player1.getName());
    console.log(Player1State);
    console.log(Player2State);
    
    console.log(gameChecker(TicTacToe, Player1.getSign(), Player1.getName()));
    console.log(gameChecker(TicTacToe, Player2.getSign(), Player2.getName()));
  */
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
