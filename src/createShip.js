

export const Ship = (size, name) => {
    const getName = () => name;
    const tiles = [...Array(size).keys()]

    const hit = (position) => {
        tiles.splice(position, 1, 'hit')
    }

    const isSunk = ()=>{
        let sunk = true
        for (let i=0;i<tiles.length;i++){
            if (tiles[i] !== 'hit'){
                sunk = false;
            }
        }
        return sunk === true ? true : false;
    }

    return {tiles, hit, isSunk, getName};
};
