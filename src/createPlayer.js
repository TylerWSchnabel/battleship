import { last } from "lodash";
import { Gameboard } from "./createGameboard";

export const Player = (name, human) => {
    const getName = () => name;
    const isHuman = () => human;


    
    const attack = (x,y) => {
        return Gameboard.receiveAttack(x,y);
    }
    let lastTurn = [];
    let lastResult = '';
    const compAttack = () => {
        let attackExecuted = true;
        while (attackExecuted === true){
            let x= Math.floor(Math.random() * 10);
            let y= Math.floor(Math.random() * 10);
            if (Gameboard.board[x][y] !== "hit" || Gameboard.board[x][y] !=="miss" ){
                attack(x,y);
                lastResult = attack(x,y);
                if (lastResult === true){
                    lastTurn[0] = x;
                    lastTurn[1] = y;
                }
                attackExecuted = false;
                return attack(x,y);
            }
        }
    }
    
    return {getName,isHuman, attack, compAttack}
};