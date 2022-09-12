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
   

    comp.board.setCompBoard(comp.fleet);

    
}