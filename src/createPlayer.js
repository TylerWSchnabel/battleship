
import { Gameboard } from "./createGameboard";
import { Ship } from "./createShip";

export const Player = (name, human) => {
    const getName = () => name;
    const isHuman = () => human;
    const fleet = [];
    let boradName;
    let turn = false;
    if (human === true){
        boradName = "user";
    } else {
        boradName = "comp";
    }
    const board = Gameboard(boradName, human);

    const createFleet = () => {
        const Carrier = Ship(5, 'Carrier');
        const Destroyer = Ship(2, 'Destroyer');
        const Battleship = Ship(4, 'Battleship');
        const Submarine = Ship(3, 'Submarine');
        const Cruiser = Ship(3, 'Cruiser');
        fleet.push(Carrier);
        fleet.push(Destroyer);
        fleet.push(Battleship);
        fleet.push(Submarine);
        fleet.push(Cruiser);
    }
    
    const attack = (x,y, Gameboard) => {
        Gameboard.receiveAttack(x,y);
        console.log(name + " attacked");
    }
    
    let lastTurn = [];
    let lastResult = '';
    const compAttack = (playerBoard) => {
        let compTurn = true;
        while (compTurn === true){
            let x= Math.floor(Math.random() * 10);
            let y= Math.floor(Math.random() * 10);
            console.log('compAttack '+ x+' '+y)
            if (playerBoard.board[x][y] === "empty" || typeof playerBoard.board[x][y] ==="object" ){
                attack(x,y, playerBoard);
                //lastResult = attack(x,y, playerBoard);
                /*if (lastResult === true){
                    lastTurn[0] = x;
                    lastTurn[1] = y;
                }*/
                compTurn = false;
                //return attack(x,y, playerBoard);
            } else {
                console.log("already attacked");
            }
        }
    }
    const displayBoard = (opp) => {
        let boardArea = document.createElement('div');
        boardArea.setAttribute('class', 'gameboards');
        boardArea.setAttribute('id', boradName + 'Board');
        for (let i=0; i<board.board.length; i++){
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.setAttribute('id', boradName + 'Row' + i);
            for (let j=0; j<board.board[i].length; j++){
                let square = document.createElement('div');
                square.setAttribute('class', boradName + 'Square');
                square.setAttribute('id', boradName + i+j);
                if (human === false){
                    square.addEventListener('click', function fire() {
                        //while (gameOn === true){
                        opp.attack(i,j,board);
                        square.removeEventListener('click', fire);
                        if (board.areAllSunk() === false){
                            compAttack(opp.board);
                            if (opp.board.areAllSunk()=== true){
                                const playAgainBox = document.createElement('div');
                                playAgainBox.setAttribute('id', 'playAgainBox');
                                const playAgainText = document.createElement('p');
                                playAgainText.textContent = opp.name + " wins! Play Again?";
                                const playAgainYesButton = document.createElement('button');
                                playAgainYesButton.setAttribute('id', "playAgainYesButton");
                                playAgainYesButton.setAttribute('class', 'playAgainButton');
                                const playAgainNoButton = document.createElement('button');
                                playAgainNoButton.setAttribute('id', "playAgainNoButton");
                                playAgainNoButton.setAttribute('class', 'playAgainButton');
                                const playAgainButtonBox = document.createElement('div');
                                playAgainBox.appendChild(playAgainText);
                                playAgainButtonBox.appendChild(playAgainYesButton);
                                playAgainButtonBox.appendChild(playAgainNoButton);
                                playAgainBox.appendChild(playAgainButtonBox);
                            }
                        } else if (board.areAllSunk() === true){
                            const playAgainBox = document.createElement('div');
                            playAgainBox.setAttribute('id', 'playAgainBox');
                            const playAgainText = document.createElement('p');
                            playAgainText.setAttribute('id', 'playAgainText')
                            playAgainText.textContent = name + " wins! Play Again?";
                            const playAgainYesButton = document.createElement('button');
                            playAgainYesButton.setAttribute('id', "playAgainYesButton");
                            playAgainYesButton.setAttribute('class', 'playAgainButton');
                            playAgainYesButton.textContent = "Report for Duty";
                            playAgainYesButton.addEventListener('click', function(){
                                window.location.reload();
                            });
                            const playAgainButtonBox = document.createElement('div');
                            playAgainButtonBox.setAttribute('id', 'playAgainButtonBox')
                            playAgainBox.appendChild(playAgainText);
                            playAgainButtonBox.appendChild(playAgainYesButton);
                            playAgainBox.appendChild(playAgainButtonBox);
                            gameArea.appendChild(playAgainBox);
                        }
                    });
                };
                row.appendChild(square);
            }
            boardArea.appendChild(row);
            let gameArea = document.getElementById('gameArea');
            gameArea.appendChild(boardArea);
        }
    }

    return {getName,isHuman, attack, compAttack, fleet, createFleet, board, displayBoard}
};