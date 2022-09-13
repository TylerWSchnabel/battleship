
import { Gameboard } from "./createGameboard";
import { Ship } from "./createShip";

export const Player = (name, human) => {
    const getName = () => name;
    const isHuman = () => human;
    const fleet = [];
    let boradName;

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
        return Gameboard.receiveAttack(x,y);
    }
    
    let nextTurn = [];

    let inHit = false;

    const compAttack = (playerBoard) => {
        let compTurn = true;
        
        while (compTurn === true){
            let x= Math.floor(Math.random() * 10);
            let y= Math.floor(Math.random() * 10);
            if (playerBoard.board[x][y] === "empty" || typeof playerBoard.board[x][y] ==="object" ){
                attack(x,y, playerBoard);
                compTurn = false;
            }
        }
    }
    let direction = 'vertical';
    const displayShipBox = () => {
        let rotateBoxBG = document.createElement('div');
        rotateBoxBG.setAttribute('id', 'rotateBoxBG')
        let rotateBox = document.createElement('div');
            rotateBox.setAttribute('class','rotateBox');
            rotateBox.setAttribute('id', name+'rotateBoxID')
            let rotateText = document.createElement('p');
            rotateText.setAttribute('class', 'boxText');
            rotateText.textContent = 'Ship ' + fleet[0].getName();
            let rotateGraphic = document.createElement('div');
            rotateGraphic.setAttribute('class', direction+'Ship')
            rotateGraphic.setAttribute('id', 'rotateGraphic');
            rotateGraphic.draggable = true;
            function showShip(ship){
                for(let i=0; i<ship.tiles.length; i++){
                    let shipPlacment = document.createElement('div');
                    shipPlacment.setAttribute('class', 'showSquare');
                    rotateGraphic.appendChild(shipPlacment);
                }
            }
            showShip(fleet[0]);
            let rotateBtn = document.createElement('button');
            rotateBtn.setAttribute('id', 'rotateBtn');
            rotateBtn.setAttribute('class', 'playAgainButton');
            rotateBtn.textContent = "Rotate Ship";
            let rotateDirection = document.createElement('p');
            rotateDirection.textContent = direction;
            
        
            rotateDirection.textContent = direction;
            rotateDirection.setAttribute('class', 'boxText');
            rotateBox.appendChild(rotateText)
            rotateBox.appendChild(rotateGraphic);
            rotateBox.appendChild(rotateBtn);
            rotateBox.appendChild(rotateDirection);
            document.body.appendChild(rotateBox);
            document.body.appendChild(rotateBoxBG);

            rotateBtn.addEventListener('click', function(){
                board.shipDirection();
                if(direction==='vertical'){
                    direction = 'horizontal';
                } else if (direction === 'horizontal'){
                    direction = 'vertical';
                }
                document.body.removeChild(document.getElementById(name+'rotateBoxID'));
                document.body.removeChild(document.getElementById('rotateBoxBG'));
                displayShipBox();
            })
    }

    const displayBoard = (opp) => {
        document.addEventListener("dragover", function(event) {
            event.preventDefault();
          });
        let boardArea = document.createElement('div');
        boardArea.setAttribute('class', 'gameboards');
        boardArea.setAttribute('id', boradName + 'Board');
        //display placement box
        if (human ===true){
            displayShipBox();
        }
        // end placement box
    

        for (let i=0; i<board.board.length; i++){
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.setAttribute('id', boradName + 'Row' + i);
            for (let j=0; j<board.board[i].length; j++){
                let square = document.createElement('div');
                square.setAttribute('class', boradName + 'Square');
                square.setAttribute('id', boradName + i+j);
                if (human === true){
                    square.addEventListener('dragover', function(){
                        if (board.spotAvail(i,j,fleet[0].tiles.length) === true){
                            square.setAttribute('class', 'available');
                        } else {
                            square.setAttribute('class', 'unavailable')
                        }
                    })
                    square.addEventListener('dragleave', function(){
                        if (typeof board.board[i][j] === 'object'){
                            square.setAttribute('class', 'userShip');
                        } else {
                            square.setAttribute('class', 'userSquare');
                        }
                        
                    })
                    square.addEventListener('drop', function(){
                        if (board.spotAvail(i,j,fleet[0].tiles.length) === true){
                            board.placeShip(i,j,fleet[0]);
                            fleet.splice(0,1);
                            document.body.removeChild(document.getElementById(name+'rotateBoxID'));
                            document.body.removeChild(document.getElementById('rotateBoxBG'));
                            if (fleet.length > 0){
                                displayShipBox();
                            }
                        } else {
                            if (typeof board.board[i][j] === 'object'){
                                square.setAttribute('class', 'userShip');
                            } else {
                                square.setAttribute('class', 'userSquare');
                            }
                        }
                    });
                } else if (human === false){
                    
                    square.addEventListener('click', function fire() {
                        opp.attack(i,j,board);
                        square.removeEventListener('click', fire);
                        if (board.areAllSunk() === false){
                            if (opp.board.areAllSunk()=== true){
                                const playAgainBox = document.createElement('div');
                                playAgainBox.setAttribute('class', 'alertBox');
                                const playAgainText = document.createElement('div');
                                playAgainText.setAttribute('id', 'playAgainText');
                                const playAgainWinnerText = document.createElement('p');
                                playAgainWinnerText.setAttribute('class', 'boxText');
                                playAgainWinnerText.textContent = name + " wins!";
                                const playAgainQuestion = document.createElement('p');
                                playAgainQuestion.setAttribute('class', 'boxText');
                                playAgainQuestion.textContent = "Play Again?"
                                playAgainText.appendChild(playAgainWinnerText);
                                playAgainText.appendChild(playAgainQuestion);
                                const playAgainYesButton = document.createElement('button');
                                playAgainYesButton.setAttribute('id', "playAgainYesButton");
                                playAgainYesButton.setAttribute('class', 'playAgainButton');
                                playAgainYesButton.textContent = "Anchors aweigh";
                                playAgainYesButton.addEventListener('click', function(){
                                    window.location.reload();
                                });
                                const playAgainButtonBox = document.createElement('div');
                                const playAgainBoxBG = document.createElement('div');
                                playAgainBoxBG.setAttribute('class', 'bgBox')
                                playAgainButtonBox.setAttribute('id', 'playAgainButtonBox')
                                playAgainBox.appendChild(playAgainText);
                                playAgainButtonBox.appendChild(playAgainYesButton);
                                playAgainBox.appendChild(playAgainButtonBox);
                                playAgainBoxBG.appendChild(playAgainBox);
                                gameArea.appendChild(playAgainBoxBG);
                            }
                            setTimeout(function(){compAttack(opp.board)}, 200);
                        } else if (board.areAllSunk() === true){
                            const playAgainBox = document.createElement('div');
                            playAgainBox.setAttribute('class', 'alertBox');
                            const playAgainText = document.createElement('div');
                            playAgainText.setAttribute('id', 'playAgainText');
                            const playAgainWinnerText = document.createElement('p');
                            playAgainWinnerText.setAttribute('class', 'boxText');
                            playAgainWinnerText.textContent = opp.getName() + " wins!";
                            const playAgainQuestion = document.createElement('p');
                            playAgainQuestion.setAttribute('class', 'boxText');
                            playAgainQuestion.textContent = "Play Again?"
                            playAgainText.appendChild(playAgainWinnerText);
                            playAgainText.appendChild(playAgainQuestion);
                            const playAgainYesButton = document.createElement('button');
                            playAgainYesButton.setAttribute('id', "playAgainYesButton");
                            playAgainYesButton.setAttribute('class', 'playAgainButton');
                            playAgainYesButton.textContent = "Anchors aweigh";
                            playAgainYesButton.addEventListener('click', function(){
                                window.location.reload();
                            });
                            const playAgainButtonBox = document.createElement('div');
                            const playAgainBoxBG = document.createElement('div');
                            playAgainBoxBG.setAttribute('class', 'bgBox')
                            playAgainButtonBox.setAttribute('id', 'playAgainButtonBox')
                            playAgainBox.appendChild(playAgainText);
                            playAgainButtonBox.appendChild(playAgainYesButton);
                            playAgainBox.appendChild(playAgainButtonBox);
                            playAgainBoxBG.appendChild(playAgainBox);
                            gameArea.appendChild(playAgainBoxBG);
                        }
                    });
                }
                row.appendChild(square);
            }
            boardArea.appendChild(row);
            let gameArea = document.getElementById('gameArea');
            gameArea.appendChild(boardArea);
        }
    }

    return {getName,isHuman, attack, compAttack, fleet, createFleet, board, displayBoard}
};