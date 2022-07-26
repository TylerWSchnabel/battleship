import { Ship } from "./createShip.js";

it('test Ship', () => {
    const destoryer = Ship(3);
    expect(destoryer.getHealth()).toBe(3);
})

it('test Ship tiles', ()=>{
    const destoryer = Ship(3);
    expect(destoryer.tiles.length).toBe(3);
})

it('test Ship tiles', ()=>{
    const carrier = Ship(5);
    expect(carrier.tiles).toStrictEqual([0,1,2,3,4]);
})

it('testing hit',()=>{
    const carrier = Ship(5);
    carrier.hit(3);
    expect(carrier.tiles[3]).toBe('hit');
})
it('testing hit',()=>{
    const carrier = Ship(5);
    carrier.hit(3);
    expect(carrier.tiles[2]).toBe(2);
})

it('testing isSunk = false', () => {
    const destoryer = Ship(3);
    expect(destoryer.isSunk()).toBe(false);
})
it('testing isSunk = true', () => {
    const destoryer = Ship(3);
    destoryer.hit(0);
    destoryer.hit(1);
    destoryer.hit(2);
    expect(destoryer.isSunk()).toBe(true);
})

it('testing isSunk = false', () => {
    const destoryer = Ship(3);
    destoryer.hit(0);
    destoryer.hit(2);
    expect(destoryer.isSunk()).toBe(false);
})