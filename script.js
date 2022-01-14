const gameBoard = (() => {
    let board = ['','','',
                 '','','',
                 '','','']

    const getBoard = () => board
    const updateBoard = (index, move) => board[index] = move 
    return {getBoard, updateBoard}                 
})()
const displayController = (() => {
    let domBoard = document.querySelectorAll('.container .grid-cell')
    const render = () => {
        domBoard.forEach((cell, i) => cell.textContent = gameBoard.getBoard()[i])
    }

    return {render}
})()

const Player = (name, playerMove) => {
    return {name, playerMove}
}
let jeff = Player('jeff', 'X')
let kim = Player('Kim', 'O')
const game = (() => {
    let domBoard = document.querySelectorAll('.container .grid-cell')
    let init = (playerOne, PlayerTwo) => {
        domBoard.forEach((cell, index) => cell.addEventListener('click', () => {
            gameBoard.updateBoard(index, playerOne.playerMove)
            console.log(gameBoard.getBoard())
            displayController.render()
        }))            
    }
    return {init}
})()