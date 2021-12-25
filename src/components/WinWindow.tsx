import React, {FC} from 'react';

type props = any;

const WinWindow: FC<props> = ({retryGame}) => {
    return (
        <div className="win-window">
            <div className="win-wrap">
                <img src="../img/bg-win.gif" alt="win" />
                <button onClick={retryGame}></button>
            </div>
            
        </div>
    )
}

export default WinWindow;