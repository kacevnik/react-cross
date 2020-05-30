import React, {useContext} from 'react'
import { Context } from '../context';

function NonoButtons({size}){
    const { onSize, onClearCross } = useContext(Context);
    return(
        <div className="nono-buttons">
            <div className="nono-buttons-item">
                <span onClick={()=>onSize('minus')} className={size === 14 ? 'nono-buttons-empty' : ''}>Уменьшить</span>
            </div>
            <div className="nono-buttons-item">
                <span onClick={()=>onSize('plus')} className={size === 28 ? 'nono-buttons-empty' : ''}>Увеличить</span>
            </div>
            <div className="nono-buttons-item">
                <span onClick={onClearCross}>Очистить</span>
            </div>
            <div className="nono-buttons-item">
                <span>Отменить</span>
            </div>
            <div className="nono-buttons-item">
                <span>Сохранить</span>
            </div>
            <div className="nono-buttons-item">
                <span>Ответ</span>
            </div>
        </div>
    )
}

export default NonoButtons