import React, { FC, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '../data/colors';

type props = any;


const Card: FC<props> = ({id, disabled}) => {
    const card = useRef<HTMLDivElement>(null);
    const [className, setClassName] = useState<string>()
    const [thisId, setThisId] = useState<string>();

    const flipCard = (e: any): void => {
        if (e.target.classList.contains('card')) return;

        if (disabled && !e.target.parentElement.classList.contains('turned')) {
            card.current?.classList.add('turned');
        }        
    }
    useMemo(() => setThisId(id), [])

    useEffect(() => {
        const currentClass = 'back ' + colors[id];
        setClassName(currentClass)
    }, [])

    return (
        <div id={thisId} className="card" ref={card} onClick={flipCard}>
            <div className="front"></div>
            <div className={className}></div>
        </div>
    )
}

export default Card;