
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
            if (playerBoard.board[x][y] !== "hit" || playerBoard.board[x][y] !=="miss" ){
                attack(x,y, playerBoard);
                //lastResult = attack(x,y, playerBoard);
                /*if (lastResult === true){
                    lastTurn[0] = x;
                    lastTurn[1] = y;
                }*/
                compTurn = false;
                //return attack(x,y, playerBoard);
            }
        }
    }
    
    return {getName,isHuman, attack, compAttack, fleet, createFleet, board}
};