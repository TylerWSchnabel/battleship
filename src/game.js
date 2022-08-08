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


const userCarrier = Ship(5, 'userCarrier');
const compCarrier =Ship(5, 'compCarrier');
const compDestroyer = Ship (2, 'compDestroyer');
const compBattleship = Ship(4, 'compBattleship');
const compSubmarine = Ship(3, 'compSubmarine');
const compCruiser =Ship(3, 'compCruiser');
compBoard.compPlaceShip(compBattleship);
compBoard.compPlaceShip(compDestroyer);
compBoard.compPlaceShip(compCarrier);
compBoard.compPlaceShip(compSubmarine);
compBoard.compPlaceShip(compCruiser);
console.log(compBoard.direction);
userBoard.placeShip(3,4, userCarrier);
console.log(compBoard.board);
//userBoard.gameOn();
}