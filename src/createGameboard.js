
import { Ship } from "./createShip";

export const Gameboard = (player, user) => {
    let game = false;
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
        let open = true
        if (direction === "vertical"){
            if(y+length>9){
                open = false;
                return open;
            }else {
                for (let i=y; i<length; i++){
                    if (typeof board[x][i] !== "string"){
                        open = false;
                        return open;
                    }
                }
            }
        } else if (direction === "horizontal"){
            if(x+length>9){
                open = false;
                return open;
            }else {
                for (let i=x; i<length; i++){
                    if (typeof board[i][y] !== "string"){
                        open = false;
                        return open;
                    }
                }
            }
        }
        return open;
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
                console.log(board);
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
                console.log(x+' '+y+ ' '+ direction +" "+ship.getName());
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
                alert(board[x][y].name.getName() + " is Sunk");
            }
            board[x][y] = "hit";
            if(areAllSunk() === true) {
                    alert("Game Over! All "+player+"'s ships sank");
                }
            return "hit";
        } else {
            board[x][y] = "miss";
            spot.setAttribute('class', 'miss');

            return "miss";
        }
    };

    const areAllSunk = () => {
        let sunk = true;
        for (let x=0; x<board.length; x++){
            for(let y=0; y<board[x].length; y++){
                if(typeof board[x][y] !== 'string'){
                    sunk = false;
                    return sunk
                }
            }
        }
        return sunk;
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