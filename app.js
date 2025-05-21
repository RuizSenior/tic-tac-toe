
const board = ["", "", "", "", "", "", "", "", ""];
const boardContainer = document.getElementById("board");

let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");
const winningMessage = () => `Player ${currentPlayer} has won! 🥳`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.getElementById("btn").addEventListener("click", () => {
  board.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.innerHTML = currentPlayerTurn();
  drawBoard();
})

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
    cellElement.setAttribute("data-cell-index", index);

    cellElement.addEventListener("click", () => handleCellClick(index))
    boardContainer.appendChild(cellElement);
  });
}

function handleCellClick(index) {
  if (board[index] !== "" || !gameActive) {
    return;
  }
  board[index] = currentPlayer;

  const cellElement = document.querySelector(`[data-cell-index='${index}']`);
  cellElement.innerHTML = currentPlayer;
  cellElement.classList.add(currentPlayer === "X" ? "cross" : "circle");
  cellElement.style.cursor = "default";

  cellElement.classList.add("pop");
  setTimeout(() => cellElement.classList.remove("pop"), 300);

  checkResult();
}

function checkResult() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === "" || board[b] === "" || board[c] === "") {
      continue;
    }
    if (board[a] === board[b] && board[a] === board[c]) {
  
      [a, b, c].forEach(index => {
        const cellElement = document.querySelector(`[data-cell-index='${index}']`);
        cellElement.classList.add("winner");
      });

      statusDisplay.innerHTML = winningMessage();
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
  }
}


drawBoard();