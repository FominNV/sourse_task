import React from 'react';

const usePlayGame: Function = () => {
    
    const createRandomArr = (): number[] => {
        const data = [];
        for (let i = 0; i <= 17; i++) {
            let elem = i
            if (elem > 8) {
                elem -= 9;
            }
            data.push(elem);
            data.push(elem);
        }
        data.sort(() => Math.random() - 0.5)
        return data;
        }
    
    return [createRandomArr];
}

export default usePlayGame;