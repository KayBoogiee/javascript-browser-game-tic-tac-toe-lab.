
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board, turn, winner, tie;


const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');


function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((val, idx) => {
    squareEls[idx].textContent = val;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `Turn: ${turn}`;
  } else if (!winner && tie) {
    messageEl.textContent = `It's a tie!`;
  } else {
    messageEl.textContent = `Player ${turn} wins!`;
  }
}

function handleClick(evt) {
  const squareIndex = parseInt(evt.target.id);

  if (board[squareIndex] || winner) return;

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(idx) {
  board[idx] = turn;
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  });
}

function checkForTie() {
  if (winner) return;
  tie = board.every(cell => cell !== '');
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X';
}


squareEls.forEach(sqr => sqr.addEventListener('click', handleClick));
resetBtnEl.addEventListener('click', init);

init();
