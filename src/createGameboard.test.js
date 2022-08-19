import { Gameboard } from "./createGameboard";
import { Ship } from "./createShip.js";

it('test areAllSunk - second', () => {
    const tylerBoard = Gameboard('tyler', true);
    expect(tylerBoard.areAllSunk()).toBe(true);
})


it('typeof  ==== object', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    expect(typeof tylerBoard.board[0][0]).toBe("object")
})



it('test areAllSunk to be false', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    expect(tylerBoard.areAllSunk()).toBe(false);
})

it('Spot avail - false', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(1,0, destroyer)
    const carrier = Ship(5, "carrier")
    tylerBoard.shipDirection();
    expect(tylerBoard.spotAvail(0,2,carrier.tiles.length)).toBe(false)
})

it('Spot avail - false', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(1,0, destroyer)
    tylerBoard.shipDirection();
    const carrier = Ship(5, "carrier")
    expect(tylerBoard.spotAvail(0,1,carrier.tiles.length)).toBe(false)
})

it.skip('ship hit vertical', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    const carrier = Ship(5, "carrier")
    expect(tylerBoard.receiveAttack(2,0)).toBe("hit");
})

it.skip('ship miss vertical', () => {
    expect(Gameboard.receiveAttack(3,5)).toBe("miss");
})

it.skip('ship hit horizontal', () => {
    expect(Gameboard.receiveAttack(0,4)).toBe("hit");
})

it.skip('ship miss horizontal', () => {
    expect(Gameboard.receiveAttack(1,4)).toBe("miss");
})

it('areAllSunk = false', () => {
    const tylerBoard = Gameboard('tyler', true)
    const patrol = Ship(2,'patrol');
    tylerBoard.placeShip(0,3, patrol);
    expect(tylerBoard.areAllSunk()).toBe(false);
})

it('space content', () => {
    const tylerBoard = Gameboard('tyler', true)
    const patrol = Ship(2,'patrol');
    tylerBoard.placeShip(0,3, patrol);
    expect(typeof tylerBoard.board[0][3]).toBe('object');
})

it.skip('areAllSunk = True after sinking ships', () => {
    Gameboard.receiveAttack(0,0);
    Gameboard.receiveAttack(1,0);
    Gameboard.receiveAttack(0,3);
    Gameboard.receiveAttack(0,5);
    expect(Gameboard.areAllSunk()).toBe(true);
})

it.skip('cruiser isSunk - true', () => {
    const tylerBoard = Gameboard('tyler', true)
    const cruiser = Ship(2, "cruiser");
    tylerBoard.placeShip(8,0,cruiser);
    tylerBoard.receiveAttack(8,0);
    cruiser.hit(0);
    tylerBoard.receiveAttack(8,1);
    cruiser.hit(1);
    expect(cruiser.isSunk()).toBe(true);
})

