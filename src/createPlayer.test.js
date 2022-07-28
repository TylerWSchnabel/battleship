import { Player } from './createPlayer';
import { Gameboard } from './createGameboard';

it('get player name', () => {
    const tyler = Player("Tyler");
    expect(tyler.getName()).toBe("Tyler")
})

it.skip("player attack", () => {
    const tyler = Player("Tyler");
    expect(tyler.attack(0,0)).toBe("hit")
})