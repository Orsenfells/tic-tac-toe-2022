const gameBoard = (() => {
    let board = ['','','',
                 '','','',
                 '','','']

    const getBoard = () => board
    const updateBoard = (index, move) => {
        board[index] = move
    } 
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
    let turn;
    const _updateTurn = (playerOne, playerTwo) => {
        if(!turn) {
            turn = playerOne.playerMove;
            console.log('he')
            return
        }
        turn = (turn === playerOne.playerMove) ? playerTwo.playerMove : playerOne.playerMove
    }
    let _clickHandler = (index) => {
        gameBoard.updateBoard(index, turn)

        displayController.render()
    }
    let init = (playerOne, playerTwo) => {
        _updateTurn(playerOne, playerTwo)
        domBoard.forEach((cell, index) => cell.addEventListener('click', () => {
            if(cell.textContent) {
                return
            }
            _clickHandler(index)
            _updateTurn(playerOne, playerTwo)
        }))            
    }
    return {init}
})()