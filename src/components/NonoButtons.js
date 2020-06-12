import React, {useContext} from 'react'
import { Context } from '../context';

function NonoButtons({size, history}){
    const { onSize, onClearCross, stepBackHistory } = useContext(Context);

    const count = history.length <= 1 ? '' : '(' + (history.length - 1) + ')'

    const showCrossImg = () => {
        document.getElementById("nonogramsImageShow").click();
    }
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
                <span onClick={()=>stepBackHistory()}>Отменить {count}</span>
            </div>
            <div className="nono-buttons-item">
                <span>Сохранить</span>
            </div>
            <div className="nono-buttons-item">
                <span onClick={showCrossImg}>Ответ</span>
            </div>
        </div>
    )
}

export default NonoButtons