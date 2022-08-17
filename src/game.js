import { Gameboard } from "./createGameboard";
import { Player } from "./createPlayer";
import { Ship } from "./createShip";

export const Game = () => {

const userBoard = Gameboard('user', true);
const compBoard = Gameboard('comp', false);



let gameArea = document.createElement('div');
gameArea.setAttribute('id', 'gameArea');
document.body.appendChild(gameArea);

compBoard.displayBoard();
userBoard.displayBoard();
console.log(compBoard.board);

const compFleet = [];
const userCarrier = Ship(5, 'userCarrier');
userBoard.placeShip(3,4,userCarrier);
const compCarrier =Ship(5, 'compCarrier');
const compDestroyer = Ship (2, 'compDestroyer');
const compBattleship = Ship(4, 'compBattleship');
const compSubmarine = Ship(3, 'compSubmarine');
const compCruiser =Ship(3, 'compCruiser');
compFleet.push(compBattleship);
compFleet.push(compDestroyer);
compFleet.push(compCarrier);
compFleet.push(compSubmarine);
compFleet.push(compCruiser);
function setCompBoard(arr){
    for (let i=0; i<arr.length; i++){
        compBoard.compPlaceShip(arr[i]);
    }
}

setCompBoard(compFleet);

console.log(typeof userBoard.board[3][4]);
console.log(typeof userBoard.board[3][5]);
console.log('compBoard');
console.log(compBoard.board);
//userBoard.gameOn();
}