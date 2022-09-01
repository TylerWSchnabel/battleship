import { Gameboard } from "./createGameboard";
import { Player } from "./createPlayer";
import { Ship } from "./createShip";

export const Game = () => {
    let titleBox = document.createElement('div');
    titleBox.setAttribute('class', 'titleBox');
    let titleText = document.createElement('h1');
    titleText.setAttribute('class', 'titleText');
    titleText.textContent = "Battleship";
    titleBox.appendChild(titleText);
    document.body.appendChild(titleBox);
    

    const human = Player('User', true);
    const comp = Player('Computer', false);
    
    let gameArea = document.createElement('div');
    gameArea.setAttribute('id', 'gameArea');
    document.body.appendChild(gameArea);

    human.createFleet();
    comp.createFleet();
    comp.displayBoard(human);
    human.displayBoard(comp);
    

    
    /*human.board.placeShip(3,4, human.fleet[0]);
    human.board.shipDirection();
    human.board.placeShip(7,4,human.fleet[1]);
    human.board.shipDirection();
    human.board.placeShip(0,0,human.fleet[2]);
    human.board.placeShip(9,0, human.fleet[3]);
    human.board.shipDirection();
    human.board.placeShip(4,9, human.fleet[4]);*/

    comp.board.setCompBoard(comp.fleet);

    console.log('compBoard');
    console.log(comp.board.board);
    console.log('userBoard');
    console.log(human.board.board);

    human.turn = true;
    let gameOn = true;
}