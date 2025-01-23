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

    const initializeGame = (playerOneName = "Player One", playerTwoName = "Player Two") => {
        playerOne = createPlayer(playerOneName, "X");
        playerTwo = createPlayer(playerTwoName, "O");
        activePlayer = playerOne;
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

        return winner;
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

        //player places letter
        gameBoard.placeLetter(index, activePlayer.letter);

        //check for win
        checkForWin();

        //switch active player
        switchActivePlayer();
    };

    const resetGame = () => {
        winner = "";
        activePlayer = playerOne;
        for (let i = 0; i < board.length; i++) {
            board[i] = null;
        }
    }

    const getActivePlayer = () => activePlayer;

    return {initializeGame, checkForWin, getActivePlayer, playRound, resetGame};
})();

const displayController = (() => {
    const boardElement = document.querySelector(".gameboard");
    boardElement.addEventListener("click", (event) => {
        const target = event.target;
        gameController.playRound(target.id);
        target.textContent = gameBoard.getBoard()[target.id];
    });
})();

gameController.initializeGame();