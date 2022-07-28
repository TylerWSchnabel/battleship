import { Ship } from "./createShip";

export const Gameboard = (() => {
    let allSunk = false;
    let board = [];
    let direction = "vertical";
    const init = () => {
        for (let x=0; x<10; x++){
            board.push([]);
            for (let y = 0; y<10; y++){
                board[x].push('empty');
            }
        }
    };

    const spotAvail = (x,y,length) => {
        let open = true;
        for (let i=0; i<length; i++){
            if(board[x][y] !== "empty"){
                open = false;
                if (direction === "horizontal"){
                    y++;
                } else if (direction === "vertical"){
                    x++;
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
        if (spotAvail(x,y,ship.length) === true){
            for (let i=0; i<ship.tiles.length; i++){
                board[x][y] = ship.tiles[i];
                if (direction === "horizontal"){
                    y++;
                } else if (direction === "vertical"){
                    x++;
                }
            }
        } else {
            alert("Spot is taken");
        }
    }

    const receiveAttack = (x,y) => {
        if (board[x][y] !== "empty"){
            board[x][y] = "hit";
            return "hit";
        } else {
            board[x][y] = "hit";
            return "miss";
        }
    };

    const areAllSunk = () => {
        for (let x=0; x<board.length; x++){
            return board[x].every(element => {
                return typeof element === 'string';
              });
        }
    }
    return {init, placeShip, receiveAttack, shipDirection, board, areAllSunk}
})();