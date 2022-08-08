import { Gameboard } from "./createGameboard";
import { Ship } from "./createShip.js";

it('Gameboard setup', () => {
    const tylerBoard = Gameboard('tyler', true)
    expect(tylerBoard.board).toStrictEqual(
        [["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"]]
    )
})
it('test areAllSunk', () => {
    const tylerBoard = Gameboard('tyler', true)
    expect(tylerBoard.areAllSunk()).toBe(true);
})

it.skip('place ship vertical', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    expect(tylerBoard.board).toEqual(
        [[{name: destroyer, spot: 0},"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        [{name: destroyer, spot: 1},"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        [{name: destroyer, spot: 2},"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"]])
})

it('typeof  ==== object', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    expect(typeof tylerBoard.board[0][0]).toBe("object")
})

it.skip('place ship horizonatal', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    const destroyer2 = Ship(3, "destroyer2");
    tylerBoard.shipDirection();
    tylerBoard.placeShip(0,3, destroyer2);
    expect(Gameboard.board).toStrictEqual(
        [[0,"empty","empty",0,1,2,"empty","empty","empty","empty"],
        [1,"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        [2,"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"]
    ])
})

it('test areAllSunk to be false', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    expect(tylerBoard.areAllSunk()).toBe(false);
})

it('Spot taken - false', () => {
    const tylerBoard = Gameboard('tyler', true)
    const destroyer = Ship(3,"destroyer");
    tylerBoard.placeShip(0,0, destroyer)
    const carrier = Ship(5, "carrier")
    expect(tylerBoard.spotAvail(0,1,carrier.tiles.length)).toBe(false)
})

it('ship hit vertical', () => {
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

it.skip('areAllSunk = false', () => {
    expect(Gameboard.areAllSunk()).toBe(false);
})

it.skip('areAllSunk = True after sinking ships', () => {
    Gameboard.receiveAttack(0,0);
    Gameboard.receiveAttack(1,0);
    Gameboard.receiveAttack(0,3);
    Gameboard.receiveAttack(0,5);
    expect(Gameboard.areAllSunk()).toBe(true);
})

it.skip('cruiser isSunk - true', () => {
    const cruiser = Ship(2, "cruiser");
    Gameboard.placeShip(8,0,cruiser);
    Gameboard.receiveAttack(8,0);
    cruiser.hit(0);
    Gameboard.receiveAttack(8,1);
    cruiser.hit(1);
    expect(cruiser.isSunk()).toBe(true);
})

