const gameBoard = (() => {
    const board = new Array(9);

    const getBoard = () => board;

    const placeLetter = (index, letter) => {
        board[index] = letter;
    }

    return {getBoard, placeLetter};
})();


const createPlayer = (name, letter) => {
    return {name, letter};
};


const gameController = (() => {
    
})();