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
    const destoryer = Ship(3);
    Gameboard.placeShip(0,0, destoryer)
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

it('place ship horizonatal', () => {
    const destoryer = Ship(3);
    Gameboard.shipDirection();
    Gameboard.placeShip(0,3, destoryer);
    expect(Gameboard.board).toEqual(
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

it.skip('Place ship - spot taken', () => {
    expect(Gameboard.placeShip).toBe()
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

