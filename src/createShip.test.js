import { Ship } from "./createShip.js";

it('test Ship', () => {
    const destoryer = Ship(3);
    expect(destoryer.getHealth()).toBe(3);
})