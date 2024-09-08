const grid = document.getElementById('grid');
const statusMessage = document.getElementById('statusMessage');

let columns = 7;
let rows = 6;
let currentPlayer = 'R'; // 'R' is red, 'B' is black
let gameWon = false;

// Create the grid structure
let board = [];
for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < columns; col++) {
        board[row][col] = '';
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        grid.appendChild(cell);
    }
}

// Add event listener for clicks on the grid
grid.addEventListener('click', handleClick);

function handleClick(e) {
    if (gameWon) return;
    
    const col = e.target.dataset.col;
    if (!col) return;

    // Find the next available row in this column
    const row = findAvailableRow(col);
    if (row === null) return; // No available row

    // Place the player's piece on the board
    board[row][col] = currentPlayer;
    const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
    cell.classList.add(currentPlayer === 'R' ? 'red' : 'black');

    // Check for a winner
    if (checkWinner(currentPlayer)) {
        statusMessage.textContent = `${currentPlayer === 'R' ? 'Red' : 'Black'} wins!`;
        gameWon = true;
    } else if (isBoardFull()) {
        statusMessage.textContent = "It's a tie!";
        gameWon = true;
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'R' ? 'B' : 'R';
        statusMessage.textContent = `${currentPlayer === 'R' ? 'Red' : 'Black'}'s Turn`;
    }
}

function findAvailableRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === '') {
            return row;
        }
    }
    return null;
}

function checkWinner(player) {
    // Check horizontal, vertical, and diagonal directions
    return checkHorizontal(player) || checkVertical(player) || checkDiagonal(player);
}

function checkHorizontal(player) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] === player && board[row][col + 1] === player &&
                board[row][col + 2] === player && board[row][col + 3] === player) {
                return true;
            }
        }
    }
    return false;
}

function checkVertical(player) {
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns; col++) {
            if (board[row][col] === player && board[row + 1][col] === player &&
                board[row + 2][col] === player && board[row + 3][col] === player) {
                return true;
            }
        }
    }
    return false;
}

function checkDiagonal(player) {
    // Check downward-right diagonals
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] === player && board[row + 1][col + 1] === player &&
                board[row + 2][col + 2] === player && board[row + 3][col + 3] === player) {
                return true;
            }
        }
    }

    // Check upward-right diagonals
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] === player && board[row - 1][col + 1] === player &&
                board[row - 2][col + 2] === player && board[row - 3][col + 3] === player) {
                return true;
            }
        }
    }
    return false;
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== ''));
}
