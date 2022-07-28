import { Gameboard } from "./createGameboard";

export const Player = (name) => {
    const getName = () => name

    const attack = (x,y) => {
        if (Gameboard.board[x][y]!== "empty"){
            alert("Space already attacked. Don't waste missiles!")
        } else {
        Gameboard.receiveAttack(x,y);
        }
    }
    
    return {getName,attack}
};