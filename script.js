const board = document.querySelector(".board");
const squares = [];
const message = document.querySelector(".message");

let currentPlayer = "X";
let gameStatus = "Game On";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.index = i;
    square.addEventListener("click", handleClick);
    squares.push(square);
    board.appendChild(square);
  }
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (squares[index].textContent === "" && gameStatus === "Game On") {
    squares[index].textContent = currentPlayer;
    if (checkWin()) {
      message.textContent = `${currentPlayer} wins!`;
      gameStatus = "Game Over";
    } else if (checkDraw()) {
      message.textContent = "It's a draw!";
      gameStatus = "Game Over";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `It's ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return squares[index].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return squares.every((square) => {
    return square.textContent !== "";
  });
}

createBoard();
message.textContent = `It's ${currentPlayer}'s turn`;

function newGame() {
  location.reload();
}