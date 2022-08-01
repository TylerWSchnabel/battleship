import { Player } from './createPlayer';
import { Gameboard } from './createGameboard';
import { Ship } from  './createShip';

it('get player name', () => {
    const tyler = Player("Tyler",true);
    expect(tyler.getName()).toBe("Tyler")
})
it('isHuman -true', () => {
    const tyler = Player("Tyler", true);
    expect(tyler.isHuman()).toBe(true)
})

it('isHuman - false',() => {
    const hal = Player("Hal", false);
    expect(hal.isHuman()).toBe(false)
})

it("player attack - hit", () => {
    Gameboard.init();
    const destroryer = Ship(3);
    Gameboard.placeShip(0,0,destroryer)
    const tyler = Player("Tyler");
    expect(tyler.attack(0,0)).toBe("hit")
})

it('player attack - miss', ( ) => {
    const tyler = Player("Tyler");
    expect(tyler.attack(5,5)).toBe('miss')
})
