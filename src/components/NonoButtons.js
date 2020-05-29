import React, {useContext} from 'react'
import { Context } from '../context';

function NonoButtons({size}){
    const { onSize } = useContext(Context);
    return(
        <div className="nono-buttons">
            <div className="nono-buttons-item">
                <span onClick={()=>onSize('minus')} className={size === 14 ? 'nono-buttons-empty' : ''}>Уменьшить</span>
            </div>
            <div className="nono-buttons-item">
                <span onClick={()=>onSize('plus')} className={size === 28 ? 'nono-buttons-empty' : ''}>Увеличить</span>
            </div>
        </div>
    )
}

export default NonoButtons