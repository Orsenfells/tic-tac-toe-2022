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

const game = (() => {
    let domBoard = document.querySelectorAll('.container .grid-cell')
    let turn;
    const _updateTurn = (playerOne, playerTwo) => {
        if(!turn) {
            turn = playerOne.playerMove;
            return
        }
        turn = (turn === playerOne.playerMove) ? playerTwo.playerMove : playerOne.playerMove
    }
    const _clickHandler = (index) => {
        gameBoard.updateBoard(index, turn)

        displayController.render()
    }
    const checkWinner = () => {
        let board = gameBoard.getBoard()
        
        const allEqual = arr => arr.every(val => val === arr[0]);
        let winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,4,8],
                         [0,3,6], [1,4,7], [2,5,8], [6,4,2]]
        let win = winCombos.some(combo => {
            let boardCombo = [board[combo[0]], board[combo[1]], board[combo[2]]]
            return allEqual(boardCombo) && board[combo[0]]
        }) 
        if(win) {
            console.log('Winner')
        } else console.log('no Winner')
    }
    const init = (playerOne, playerTwo) => {
        _updateTurn(playerOne, playerTwo)
        domBoard.forEach((cell, index) => cell.addEventListener('click', () => {
            if(cell.textContent) {
                return
            }
            _clickHandler(index)
            _updateTurn(playerOne, playerTwo)
            checkWinner()
        }))            
    }
    return {init, checkWinner}
})()

let jeff = Player('jeff', 'X')
let kim = Player('Kim', 'O')