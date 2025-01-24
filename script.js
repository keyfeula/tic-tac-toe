const gameBoard = (() => {
    const board = new Array(9).fill(null);

    const getBoard = () => board;

    const placeLetter = (index, letter) => {
        board[index] = letter;
    };

    return {getBoard, placeLetter};
})();


const createPlayer = (name, letter) => {
    return {name, letter};
};


const gameController = (() => {
    const board = gameBoard.getBoard();
    let playerOne;
    let playerTwo;
    let activePlayer;
    let winner = "";
    let gameStarted = false;

    const initializeGame = (playerOneName, playerTwoName) => {
        if (playerOneName === "") {
            playerOneName = "Player One";
        }
        if (playerTwoName === "") {
            playerTwoName = "Player Two";
        }
        playerOne = createPlayer(playerOneName, "X");
        playerTwo = createPlayer(playerTwoName, "O");
        activePlayer = playerOne;
        gameStarted = true;
    }

    const checkForWin = () => {
        const activePlayerWin = activePlayer.letter + activePlayer.letter + activePlayer.letter;

        const columnOneString = board[0] + board[3] + board[6];
        const columnTwoString = board[1] + board[4] + board[7];
        const columnThreeString = board[2] + board[5] + board[8];

        const rowOneString = board[0] + board[1] + board[2];
        const rowTwoString = board[3] + board[4] + board[5];
        const rowThreeString = board[6] + board[7] + board[8];

        const diagonalOneString = board[0] + board[4] + board[8];
        const diagonalTwoString = board[2] + board[4] + board[6];

        if (activePlayerWin === columnOneString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === columnTwoString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === columnThreeString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === rowOneString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === rowTwoString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === rowThreeString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === diagonalOneString) {
            winner = activePlayer.name;
        }
        else if (activePlayerWin === diagonalTwoString) {
            winner = activePlayer.name;
        }
        else if (!(board.includes(null))) {
            winner = "Draw";
        }
    };

    const switchActivePlayer = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        }
        else {
            activePlayer = playerOne;
        }
    };

    const playRound = (index) => {
        if (winner !== "") {
            return;
        }

        if (board[index] === null && gameController.getGameStarted()) {
            gameBoard.placeLetter(index, activePlayer.letter);
            checkForWin();
            switchActivePlayer();
        }
    };

    const resetGame = () => {
        winner = "";
        activePlayer = playerOne;
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    };

    const getActivePlayer = () => activePlayer;

    const getWinner = () => winner;

    const getGameStarted = () => gameStarted;

    return {initializeGame, checkForWin, getActivePlayer, getWinner, playRound, resetGame, getGameStarted};
})();

const displayController = (() => {
    const boardElement = document.querySelector(".gameboard");
    const display = document.querySelector(".display");
    const dialog = document.querySelector(".start-dialog");
    const boardCells = document.querySelectorAll(".cell");

    const startBtn = document.querySelector(".start-btn");
    const resetBtn = document.querySelector(".reset-btn");
    const dialogSubmitBtn = document.querySelector(".form-submit-btn");
    
    const playerOneInput = document.querySelector("input#playerOneInput");
    const playerTwoInput = document.querySelector("input#playerTwoInput");

    let playerOneName;
    let playerTwoName;

    startBtn.addEventListener("click", () => {
        gameController.resetGame();
        boardCells.forEach((cell) => cell.textContent = "");
        dialog.showModal();
    });

    resetBtn.addEventListener("click", () => {
        if (!gameController.getGameStarted()) {
            return;
        }
        gameController.resetGame();
        boardCells.forEach((cell) => cell.textContent = "");
        display.textContent = `${gameController.getActivePlayer().name}'s turn`;
    });

    dialogSubmitBtn.addEventListener("click", () => {
        playerOneName = playerOneInput.value;
        playerTwoName = playerTwoInput.value;
        gameController.initializeGame(playerOneName, playerTwoName);
        display.textContent = `${gameController.getActivePlayer().name}'s turn`;
        dialog.close();
    });

    boardElement.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target.getAttribute("class") === "cell") || !gameController.getGameStarted()) {
            return;
        }

        gameController.playRound(target.id);
        target.textContent = gameBoard.getBoard()[target.id];
        const winner = gameController.getWinner();

        if (winner === "Draw") {
            display.textContent = "It's a draw!";
        }
        else if (winner !== "") {
            display.textContent = `${winner} is the winner!`;
        }
        else if (gameController.getGameStarted()) {
            display.textContent = `${gameController.getActivePlayer().name}'s turn`;
        }
    });
})();