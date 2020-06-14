import React, {useContext} from 'react'
import { Context } from '../context';
import Timer from './Timer'

function NonoButtons({size, history, save, timer}){
    const { onSize, onClearCross, stepBackHistory, saveCross } = useContext(Context);

    const count = history.length <= 1 ? '' : '(' + (history.length - 1) + ')'

    const showCrossImg = () => {
        document.getElementById("nonogramsImageShow").click();
    }

    const saveStale ={
        color: save ? '#0ED00E' : '#7D7D7D'
    }
    return(
        <div className="nono-buttons-wrap">
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
                    <span onClick={saveCross}>Сохранить <i className="icon-checkmark" style={saveStale}></i></span>
                </div>
                <div className="nono-buttons-item">
                    <span onClick={showCrossImg}>Ответ</span>
                </div>
            </div>
            <Timer timer={timer} />
        </div>
    )
}

export default NonoButtons