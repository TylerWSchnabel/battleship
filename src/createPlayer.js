
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
        //display placement box
        let rotateBox = document.createElement('div');
        rotateBox.setAttribute('class','rotateBox');
        rotateBox.setAttribute('id', 'rotateBoxID')
        let rotateText = document.createElement('p');
        rotateText.setAttribute('class', 'boxText');
        rotateText.textContent = 'Ship ' + fleet[0].getName();
        let rotateGraphic = document.createElement('div');
        rotateGraphic.setAttribute('class', 'horizontalShip')
        rotateGraphic.setAttribute('id', 'rotateGraphic');
        function showShip(ship){
            
            for(let i=0; i<ship.tiles.length; i++){
                let shipPlacment = document.createElement('div');
                shipPlacment.setAttribute('class', 'showSquare');
                rotateGraphic.appendChild(shipPlacment);
            }
        }
        showShip(fleet[0]);
        let rotateBtn = document.createElement('button');
        rotateBtn.setAttribute('class', 'playAgainButton');
        rotateBtn.textContent = "Rotate Ship";
        let rotateDirection = document.createElement('p');
        rotateDirection.textContent = board.direction;
        rotateBtn.addEventListener('click', function(){
            board.shipDirection()
            rotateDirection.textContent = board.direction;
            rotateGraphic.setAttribute('class', board.direction+'Ship')
            rotateGraphic.removeChild(shipPlacment);
            showShip(fleet[0]);
            console.log(board.direction);
            rotateBox.appendChild(rotateText);
            rotateBox.appendChild(rotateGraphic);
            rotateBox.appendChild(rotateBtn);
            rotateBox.appendChild(rotateDirection);
            document.body.appendChild(rotateBox);
        })
       
        rotateDirection.textContent = board.direction;
        rotateDirection.setAttribute('class', 'boxText');
        rotateBox.appendChild(rotateText)
        rotateBox.appendChild(rotateGraphic);
        rotateBox.appendChild(rotateBtn);
        rotateBox.appendChild(rotateDirection);
        
        document.body.appendChild(rotateBox);
        // end placement box;
    

        for (let i=0; i<board.board.length; i++){
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.setAttribute('id', boradName + 'Row' + i);
            for (let j=0; j<board.board[i].length; j++){
                let square = document.createElement('div');
                square.setAttribute('class', boradName + 'Square');
                square.setAttribute('id', boradName + i+j);
                if (human === true){
                    if (fleet.length > 0){
                        
                        square.addEventListener('click', function place(){
                            if (board.spotAvail(i,j,fleet[0].tiles.length) === true){
                                board.placeShip(i,j,fleet[0]);
                                fleet.splice(0,1);
                                document.body.removeChild(document.getElementById('rotateBoxID'));
                                if (fleet.length > 0){
                                    rotateText.textContent = 'Ship ' + fleet[0].getName();
                                    rotateBox.appendChild(rotateText);
                                    rotateBox.removeChild(rotateGraphic);
                                    showShip(fleet[0]);
                                    rotateBox.appendChild(rotateGraphic);
                                    rotateBox.appendChild(rotateBtn);
                                    rotateBox.appendChild(rotateDirection);
                                    document.body.appendChild(rotateBox);
                                    console.log(fleet[0].getName())
                                    console.log(board.board);
                                }
                            } else {
                                alert('Spot unavailable');
                            }
                        });
                    } else if (fleet.length < 1){
                        square.removeEventListener('click', place);
                    }
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
                            compAttack(opp.board);
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