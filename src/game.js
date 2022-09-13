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
    let userLabel = document.createElement('p');
    userLabel.setAttribute('class', 'boardLabel');
    userLabel.textContent = "User Board";
    let compLabel = document.createElement('p');
    compLabel.setAttribute('class', 'boardLabel');
    compLabel.textContent = "Computer Board";
    let boardTitle = document.createElement('div');
    boardTitle.setAttribute('class', 'boardTitle');
    boardTitle.appendChild(compLabel);
    boardTitle.appendChild(userLabel);
    document.body.appendChild(boardTitle);
    

    const human = Player('User', true);
    const comp = Player('Computer', false);
    
    let gameArea = document.createElement('div');
    gameArea.setAttribute('id', 'gameArea');
    document.body.appendChild(gameArea);

    let directionBox = document.createElement('div');
    directionBox.setAttribute('class', 'alertBox');
    directionBox.setAttribute('id','directionBoxID')
    let directions = document.createElement('p');
    directions.setAttribute('class', 'boxText');
    directions.textContent = 'Click box on User Board to attack!';
    directionBox.appendChild(directions);
    gameArea.appendChild(directionBox);


    human.createFleet();
    comp.createFleet();
    comp.displayBoard(human);
    human.displayBoard(comp);
   

    comp.board.setCompBoard(comp.fleet);

    
}