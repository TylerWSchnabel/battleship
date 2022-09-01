
import { Ship } from "./createShip";

export const Gameboard = (player, user) => {
    let gameOn = false;
    let board = [];
    let direction = "vertical";
    const init = (() => {
        for (let x=0; x<10; x++){
            board.push([]);
            for (let y = 0; y<10; y++){
                board[x].push('empty');
            }
        }
        gameOn = true;
    })();

    const spotAvail = (x,y,length) => {
        let open = true
        if (direction === "vertical"){
            if(y+length>9){
                open = false;
                console.log(x+ " " + y +" too wide");
                return open;
            }else {
                for (let i=y; i<length; i++){
                    if (board[x][i] !== "empty"){
                        open = false;
                        console.log(x +' '+ y +" spot taken");
                        return open;
                    }
                }
            }
        } else if (direction === "horizontal"){
            if(x+length>9){
                open = false;
                console.log(x+ " " +y +" too long");
                return open;
            }else {
                for (let i=x; i<length; i++){
                    if (board[i][y] !== "empty"){
                        open = false;
                        console.log(x + " " + y +" spot taken");
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
                    if (user === true){
                        let spot = document.getElementById(player + x + y);
                        spot.setAttribute('class', 'userShip');
                    }
                    
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
                console.log(x+' '+y+ ' '+ direction +" "+ship.getName());
                placeShip(x,y,ship);
                shipDocked = false;
            }
        }
    }

    const setCompBoard = (arr) => {
        for (let i=0; i<arr.length; i++){
            compPlaceShip(arr[i]);
        }
    }

    const receiveAttack = (x,y) => {
        let spot = document.getElementById(player + x + y);
        if (typeof board[x][y] === "object"){
            spot.setAttribute('class', 'hit');
            board[x][y].name.hit(board[x][y].spot);
            console.log(board[x][y].name.tiles);
            spot.setAttribute('class', 'hit');
            let shipHit = board[x][y].name;
            board[x][y] = "hit";
            if (shipHit.isSunk() === true){
                const sunkBG = document.createElement('div');
                sunkBG.setAttribute('class', 'bgBox');
                const sunkBox = document.createElement('div');
                sunkBox.setAttribute('class', 'alertBox');
                const sunkText = document.createElement('p');
                sunkText.setAttribute('class', 'boxText');
                sunkText.textContent= player + "'s "+shipHit.getName() + " is Sunk"
                const sunkButton = document.createElement('button');
                sunkButton.setAttribute('class', 'playAgainButton');
                sunkButton.setAttribute('id', 'sunkButton');
                sunkButton.addEventListener('click', function(){
                    document.body.removeChild(sunkBG);
                })
                sunkButton.textContent = "Praise the Lord and pass the ammunition!"
                sunkBox.appendChild(sunkText);
                sunkBox.appendChild(sunkButton);
                sunkBG.appendChild(sunkBox);
                document.body.appendChild(sunkBG);

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

    return {init, placeShip, receiveAttack, shipDirection, board, areAllSunk,spotAvail, gameOn, direction, compPlaceShip, setCompBoard}
};