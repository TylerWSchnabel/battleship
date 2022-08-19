import { Gameboard } from "./createGameboard";
import { Player } from "./createPlayer";
import { Ship } from "./createShip";

export const Game = () => {

    const human = Player('Tyler', true);
    const comp = Player('Computer', false);
    
    let gameArea = document.createElement('div');
    gameArea.setAttribute('id', 'gameArea');
    document.body.appendChild(gameArea);

    comp.board.displayBoard();
    human.board.displayBoard();
    human.createFleet();
    comp.createFleet();

    human.board.placeShip(3,4, human.fleet[0]);
    human.board.shipDirection();
    human.board.placeShip(7,4,human.fleet[1]);
    human.board.shipDirection();
    human.board.placeShip(0,2,human.fleet[2]);
    human.board.placeShip(9,0, human.fleet[3]);
    human.board.shipDirection();
    human.board.placeShip(4,9, human.fleet[4]);

    comp.board.setCompBoard(comp.fleet);

    console.log('compBoard');
    console.log(comp.board.board);
    //human.gameOn();
    human.turn = true;
    let game = true;

    const takeTurns = ()=>{
        if (turn === human){
            turn = comp;
        } else if (turn === comp){
            turn = human;
        }
    }

    const playGame = () => {
        if (comp.board.receiveAttack){
            comp.compAttack(human.board);
        }
    }

    //comp.compAttack(human.board);
    playGame();
}