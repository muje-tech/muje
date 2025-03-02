const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const xScoreDisplay = document.getElementById('xScore');
const oScoreDisplay = document.getElementById('oScore');
const aiToggle = document.getElementById('aiToggle');
const difficultySelect = document.getElementById('difficulty');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xScore = 0;
let oScore = 0;

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

function handleCellClick(cell) {
    const index = cell.dataset.index;

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWin();
        if (gameActive) {
            togglePlayer();
            if (currentPlayer === 'O' && aiToggle.checked && gameActive) {
                aiMove();
            }
        }
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            updateScore(currentPlayer);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        message.textContent = "It's a draw!";
        gameActive = false;
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreDisplay.textContent = `X: ${xScore}`;
    } else if (winner === 'O') {
        oScore++;
        oScoreDisplay.textContent = `O: ${oScore}`;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

function aiMove() {
    if (!gameActive) return;

    let bestMove = findBestMove(gameBoard);
    if (bestMove !== null) {
        gameBoard[bestMove] = 'O';
        cells[bestMove].textContent = 'O';
        checkWin();
        if (gameActive) {
            togglePlayer();
        }
    }
}

function findBestMove(board) {
    let bestScore = -Infinity;
    let move;
    let difficulty = difficultySelect.value;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false, difficulty);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing, difficulty) {
    const scores = {
        X: -1,
        O: 1,
        draw: 0
    };

    const win = checkMinimaxWin(board);
    if (win) {
        return scores[win];
    }

    if (!board.includes('')) {
        return scores.draw;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false, difficulty);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true, difficulty);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        if (difficulty === "easy" && Math.random() < 0.3) return 0;
        if (difficulty === "medium" && Math.random() < 0.15) return 0;
        return bestScore;
    }
}

function checkMinimaxWin(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}