
const board = ["", "", "", "", "", "", "", "", ""];
const boardContainer = document.getElementById("board");

let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],     
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function drawBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.innerHTML = cell;
    cellElement.addEventListener("click", () => handleCellClick(index))
    boardContainer.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (board[index] !== "" || !gameActive) {
    return;
  }
  board[index] = currentPlayer;

  drawBoard();
  checkResult();
  
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue;
    }
    if (board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

drawBoard();