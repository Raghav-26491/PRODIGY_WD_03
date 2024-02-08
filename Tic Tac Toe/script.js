const board = document.getElementById('board');
const gameStatus = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;


function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById(index).innerText = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            showWinMessage(`Player ${gameBoard[a]} wins!`);
            gameActive = false;
            break;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        showWinMessage('It\'s a draw!');
        gameActive = false;
    }
}

function showWinMessage(message) {
    const winModal = document.getElementById('winModal');
    const winMessage = document.getElementById('winMessage');
    winMessage.innerText = message;
    winModal.style.display = 'flex';
}


function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    gameStatus.innerText = 'Player X\'s turn';
    resetButton.style.display = 'inline-block'; 



    const winModal = document.getElementById('winModal');
    winModal.style.display = 'none';

    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerText = '';
    }
}


board.addEventListener('click', (event) => {
    const index = event.target.id;
    handleCellClick(index);
});

resetButton.addEventListener('click', resetGame);