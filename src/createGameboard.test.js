import { Gameboard } from "./createGameboard";
import { Ship } from "./createShip.js";

it('Gameboard setup', () => {
    Gameboard.init();
    expect(Gameboard.board).toStrictEqual(
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
    expect(Gameboard.areAllSunk()).toBe(true);
})

it('place ship vertical', () => {
    const destroyer = Ship(3,"destroyer");
    Gameboard.placeShip(0,0, destroyer)
    expect(Gameboard.board).toStrictEqual(
        [[0,"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        [1,"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        [2,"empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"],
        ["empty","empty","empty","empty","empty","empty","empty","empty","empty","empty"]])
})

it('typeof  ==== object', () => {
    expect(typeof Gameboard.board[0][0]).toBe("number")
})

it('place ship horizonatal', () => {
    const destroyer2 = Ship(3, "destroyer2");
    Gameboard.shipDirection();
    Gameboard.placeShip(0,3, destroyer2);
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
    expect(Gameboard.areAllSunk()).toBe(false);
})

it('Spot taken - false', () => {
    const carrier = Ship(5, "carrier")
    expect(Gameboard.spotAvail(0,1,carrier.tiles.length)).toBe(false)
})

it('ship hit vertical', () => {
    expect(Gameboard.receiveAttack(2,0)).toBe("hit");
})

it('ship miss vertical', () => {
    expect(Gameboard.receiveAttack(3,5)).toBe("miss");
})

it('ship hit horizontal', () => {
    expect(Gameboard.receiveAttack(0,4)).toBe("hit");
})

it('ship miss horizontal', () => {
    expect(Gameboard.receiveAttack(1,4)).toBe("miss");
})

it('areAllSunk = false', () => {
    expect(Gameboard.areAllSunk()).toBe(false);
})

it('areAllSunk = True after sinking ships', () => {
    Gameboard.receiveAttack(0,0);
    Gameboard.receiveAttack(1,0);
    Gameboard.receiveAttack(0,3);
    Gameboard.receiveAttack(0,5);
    expect(Gameboard.areAllSunk()).toBe(true);
})

it('cruiser isSunk - true', () => {
    const cruiser = Ship(2, "cruiser");
    Gameboard.placeShip(8,0,cruiser);
    Gameboard.receiveAttack(8,0);
    cruiser.hit(0);
    Gameboard.receiveAttack(8,1);
    cruiser.hit(1);
    expect(cruiser.isSunk()).toBe(true);
})

