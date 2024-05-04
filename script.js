let currentPlayer = 'Amisha';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;
let ties = 0;
let gameOver = false; // Flag to track game state

function cellClicked(index) {
    const cell = document.getElementById(index);
    if (!gameOver && board[index] === '') {
        cell.innerText = currentPlayer;
        cell.classList.add('cell-clicked'); // Add animation class
        board[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'Amisha' ? 'Utkarsh' : 'Amisha';
        updatePlayerTurn();
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === 'Amisha') {
                scoreX++;
            } else {
                scoreO++;
            }
            showWinner(`${board[a]} wins!`); // Show winner message
            updateScore();
            gameOver = true; // Set game over flag
            return;
        }
    }

    if (!board.includes('')) {
        ties++;
        updateScore();
        showWinner("It's a tie!"); // Show tie message
        gameOver = true; // Set game over flag
    }
}

function updateScore() {
    document.getElementById('score-x').innerText = scoreX;
    document.getElementById('score-o').innerText = scoreO;
    document.getElementById('ties').innerText = ties;
}

function updatePlayerTurn() {
    const playerTurnElement = document.getElementById('player-turn');
    playerTurnElement.innerText = `${currentPlayer}'s Turn`;
    playerTurnElement.classList.remove('player-x', 'player-o');
    playerTurnElement.classList.add(`player-${currentPlayer.toLowerCase()}`);
}

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        board[i] = ''; // Clear the board array
    }
    currentPlayer = 'Amisha'; // Reset the current player to 'X'
    updatePlayerTurn(); // Update the player turn display
    gameOver = false; // Reset game over flag
}

function showWinner(message) {
    const resultMessageElement = document.getElementById('result-message');
    const winnerMessageElement = document.getElementById('winner-message');
    winnerMessageElement.innerText = message;
    resultMessageElement.classList.add('show');
}

function startNewRound() {
    resetBoard();
    resetGrid();
    hideWinner(); // Added to hide the winner message
}

function resetGrid() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerText = '';
    }
}

function hideWinner() {
    const resultMessageElement = document.getElementById('result-message');
    resultMessageElement.classList.remove('show');
}