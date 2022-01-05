const gameBoard = (() => {
    let board = ['x','x','o',
                 'o','x','o',
                 'o','x','x'  ]
    return {board}                 
})()

const displayController = (() => {
    let board = document.querySelectorAll('.container div');

    let updateBoard = function (updatedBoard) {
        board.forEach((cell, i) => cell.textContent = updatedBoard[i])
    }
    return {updateBoard}
})()

const Player = () => {

}