
import { Ship } from "./createShip";

export const Gameboard = (player, user) => {
    let game = false;
    let allSunk = false;
    let board = [];
    let direction = "vertical";
    const init = (() => {
        for (let x=0; x<10; x++){
            board.push([]);
            for (let y = 0; y<10; y++){
                board[x].push('empty');
            }
        }
    })();

    const gameOn=()=>{
        if (game === false){
            game =true;
        }
    }

    const spotAvail = (x,y,length) => {
        if (direction === "vertical"){
            for (let i=y; i<length; i++){
                if (board[x][i] === "empty" && i<9 ){
                    return true;
                }else {
                    return false;
                }
            }
        } else if (direction === "horizontal"){
            for (let i=x; i<length; i++){
                if (board[i][y] === "empty" && i<9){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
        

    const shipDirection = () => {
        if (direction === "horizontal"){
            direction = "vertical";
        } else if (direction === "vertical"){
            direction = "horizontal";
        }
    }

    const placeShip = (x,y,ship) => {
            if (spotAvail(x,y,ship.tiles.length) === true){
                for (let i=0; i<ship.tiles.length; i++){
                    board[x].splice(y, 1, {name: ship , spot: i})
                    if (direction === "horizontal"){
                        x++;
                    } else if (direction === "vertical"){
                        y++;
                    }
                }
                return true;
            } 
        
    }

    const compPlaceShip = (ship) => {
        let shipDocked = true;
        while (shipDocked === true){
            let x= Math.floor(Math.random() * 10);
            let y= Math.floor(Math.random() * 10);
            let d = Math.floor(Math.random() * 2);
            if (d === 1){
                shipDirection();
            }
            if (spotAvail(x,y,ship.tiles.length) === true){
                placeShip(x,y,ship);
                shipDocked = false;
            }
        }
    }

    const receiveAttack = (x,y) => {
        let spot = document.getElementById(player + x + y);
        if (board[x][y] !== "empty"){
            spot.setAttribute('class', 'hit');
            board[x][y].name.hit(board[x][y].spot);
            console.log(board[x][y].name.tiles);
            spot.setAttribute('class', 'hit');
            if (board[x][y].name.isSunk() === true){
                if (areAllSunk()=== false){
                    alert(board[x][y].name.getName() + " is Sunk");
                }else if(areAllSunk()===true) {
                    alert("Game Over! All "+player+"'s ships sank");
                }
            };
            board[x][y] = "hit";
            return "hit";
        } else {
            board[x][y] = "miss";
            spot.setAttribute('class', 'miss');

            return "miss";
        }
    };

    const areAllSunk = () => {
        for (let x=0; x<board.length; x++){
            for(let y=0; y<board[x].length; y++){
                if(board[x][y] === 'empty' || board[x][y] === 'hit'||board[x][y] === 'miss'){
                    return true;
                }
            }
        }
    }

    const displayBoard = () => {
        let boardArea = document.createElement('div');
        boardArea.setAttribute('class', 'gameboards');
        boardArea.setAttribute('id', player + 'Board');
        for (let i=0; i<board.length; i++){
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.setAttribute('id', player + 'Row' + i);
            for (let j=0; j<board[i].length; j++){
                let square = document.createElement('div');
                square.setAttribute('class', player + 'Square');
                square.setAttribute('id', player + i+j);
                square.addEventListener('click', function attack() {
                    receiveAttack(i,j);
                    square.removeEventListener('click', attack);
                });
                row.appendChild(square);
            }
            boardArea.appendChild(row);
            let gameArea = document.getElementById('gameArea');
            gameArea.appendChild(boardArea);
        }
    }
    return {init, placeShip, receiveAttack, shipDirection, board, areAllSunk,spotAvail, displayBoard, gameOn, direction,compPlaceShip}
};