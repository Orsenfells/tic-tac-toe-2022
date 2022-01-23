const gameBoard = (() => {
    let board = ['','','',
                 '','','',
                 '','','']
    
    const getBoard = () => board
    const updateBoard = (index, move) => {
        board[index] = move
    } 
    const newBoard = () => board = ['','','',
                                    '','','',
                                    '','',''] 

    return {getBoard, updateBoard, newBoard}                 
})()
const displayController = (() => {
    let domBoard = document.querySelectorAll('.container .grid-cell')
    let winnerText = document.querySelector('.winner-text')
    const render = () => {
        domBoard.forEach((cell, i) => cell.textContent = gameBoard.getBoard()[i])

        
    }
    const setPlayerName = (button, newName) => {
        button.textContent = newName
    }
    const alertWinner = (winner) => winnerText.textContent = `${winner} is the Winner!`
    const clearWinner = () =>  winnerText.textContent = ''
    const alertDraw = () => winnerText.textContent = `It's a draw!`
    return {render, alertWinner, setPlayerName, clearWinner, alertDraw}
})()
const Player = (name, playerMove) => {
    let player = {}
    player.name = name;
    const setName = (newName) => player.name = newName; 
    const getName = () => player.name
    return {setName, getName, playerMove}
}
const game = (() => {
    let domBoard = document.querySelectorAll('.container .grid-cell');
    let playerOneName = document.querySelector('#player-one-name')
    let playerTwoName = document.querySelector('#player-two-name')
    let newGameButton = document.querySelector('#new-game-button')
    let moveCount = 0
    let turn;
    newGameButton.addEventListener('click', () => {
        _newBoard()
    })
    const _updateTurn = (playerOne, playerTwo) => {
        if(!turn) {
            turn = playerOne.playerMove;
            return
        }
        turn = (turn === playerOne.playerMove) ? playerTwo.playerMove : playerOne.playerMove
    }
    const _clickHandler = (index) => {
        if(_checkWinner()) {
            
            return
        }
        gameBoard.updateBoard(index, turn)
        
        displayController.render()
    }
    const _checkWinner = () => {
        const allEqual = arr => arr.every(val => val === arr[0]);
        let board = gameBoard.getBoard()
        let winCombos = [[0,1,2], [3,4,5], [6,7,8], [0,4,8],
                         [0,3,6], [1,4,7], [2,5,8], [6,4,2]]

        let win = winCombos.some(combo => {
            let boardCombo = [board[combo[0]], board[combo[1]], board[combo[2]]]
            return allEqual(boardCombo) && board[combo[0]]
        }) 
        return win
    }
    const _newBoard = () => {
        displayController.clearWinner()
        gameBoard.newBoard();
        displayController.render();
        moveCount = 0;
        
    }
    const init = (playerOne, playerTwo) => {
        playerOne.setName(playerOneName.value)
        playerTwo.setName(playerTwoName.value)
        playerOneName.addEventListener('input', (e) => {
            playerOne.setName(e.target.value)
        })
        playerTwoName.addEventListener('input', (e) => {
            playerTwo.setName(e.target.value)
        })
        _updateTurn(playerOne, playerTwo)
        domBoard.forEach((cell, index) => cell.addEventListener('click', () => {
            if(cell.textContent) {
                return
            }
            moveCount++;
            _clickHandler(index)
            if(_checkWinner()) {
                let winner = (playerOne.playerMove === turn) ? playerOne.getName() : playerTwo.getName()
                displayController.alertWinner(winner)
                turn = undefined;
                _updateTurn(playerOne, playerTwo)
                return
            }
            if(moveCount >= 9) {
                displayController.alertDraw()
                return
            }
            _updateTurn(playerOne, playerTwo)
            
        }))           

    }
    return {init}
})()

let playerOne = Player('PlayerOne', 'X')
let playerTwo = Player('PlayerTwo', 'O')
game.init(playerOne, playerTwo)