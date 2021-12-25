import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import usePlayGame from '../hooks/usePlayGame';
import Card from './Card';

import { matrix } from '../data/matrix';
import WinWindow from './WinWindow';

const Game: FC = () => {
    const [firstCard, setFirstCard] = useState<any>();
    const [retry, setRetry] = useState<boolean>(false);
    const [win, setWin] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [guessed, setGuessed] = useState<number>(1);
    const [disabled, setDisabled] = useState<boolean>(true);

    const [createRandomArr] = usePlayGame();
    const randomNums = useMemo(() => createRandomArr(), [retry])
    const table = useRef<any>();

    const gameProvider = (e: any) => {        
        if (e.target.classList.contains('card')) return;
        
        if ( disabled && !e.target.classList.contains('back') && e.target.parentElement.classList.contains('card') ) {
            setDisabled(false);
            
            switch (step) {
                case 1: {
                    setFirstCard(e.target.parentElement)
                    setStep(2)
                    setTimeout(() => setDisabled(true), 600)
                    break;
                }
                case 2: {
                    if (firstCard!.id === e.target.parentElement.id) {
                        setStep(1);
                        setGuessed(prev => prev + 1);
                        setTimeout(() => {
                            setGuessedClass(firstCard);
                            setGuessedClass(e.target.parentElement);
                            checkWin();
                        }, 500)
                        setTimeout(() => {
                            setDisabled(true);
                        }, 600);
                    }else {
                        setStep(1);                                        
                        setTimeout(() => {
                            turnAround(firstCard)
                            turnAround(e.target.parentElement)
                        }, 800)
                        setTimeout(() => setDisabled(true), 1300);                        
                    }
                }
            }
        }        
    }

    const createTbody = () => {
        return matrix.map( (arr, i) => {        
            return <tr key={i}>{arr.map((el) => 
                <td key={el} onClick={gameProvider}> 
                    {<Card id={randomNums.splice(0, 1)} disabled={disabled} />}
                </td>)}                            
            </tr>
        })
    }

    const checkWin = () => {
        return guessed === 18 ? winGame() : false;
    }

    const winGame = () => {
        setWin(true);
    }

    const retryGame = () => {
        setWin(false);
        setGuessed(1);
        setRetry(!retry);
    }

    const setGuessedClass = (elem: any) => {
        elem.classList.add('guessed');
    }

    const turnAround = (elem: any) => {
        elem.classList.remove('turned');
    }
    
    return (
        <div className="game">
            <table ref={table}>
                <tbody>
                    {retry === true && createTbody()}
                    {retry === false && createTbody()}
                </tbody>
            </table>
            
            {win === true && <WinWindow retryGame={retryGame}/>}
        </div>
    )
}

export default Game;