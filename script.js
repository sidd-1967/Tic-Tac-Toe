// Player symbols
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initial game state
let currentPlayer = PLAYER_X;
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

// Win combinations
const winCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle a player's move
function makeMove(cellIndex) {
  if (gameActive && board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;

    if (checkWin()) {
      const message = `Player ${currentPlayer} wins!`;
      displayStatus(message);
      Swal.fire({
        html: '<img src="image/game-over.webp" alt="Image">',
        // title: 'Game Over',
        text: message,
        // icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        resetBoard();
      });
      gameActive = false;
    } else if (checkDraw()) {
      displayStatus("It's a draw!");
      Swal.fire({
        html: '<img src="image/draw.png" alt="Image">',
        title: "It's a draw",
        text: "It's a draw!",
        // icon: 'info',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        resetBoard();
      });
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      displayStatus(`Player ${currentPlayer}'s turn`);
    }
  }
}

// Function to check for a win
function checkWin() {
  for (let combination of winCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
}

// Function to check for a draw
function checkDraw() {
  return !board.includes('');
}

// Function to reset the board
function resetBoard() {
  currentPlayer = PLAYER_X;
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
  displayStatus(`Player ${currentPlayer}'s turn`);
}

// Function to display the game status
function displayStatus(message) {
  document.getElementById('status').innerText = message;
}

// Display initial game status
displayStatus(`Player ${currentPlayer}'s turn`);
