import React, {useContext} from 'react'
import { Context } from '../context';

function SelectColors({colors, color}) {

    const { changeColor } = useContext(Context);

    const elements = colors.map(el => {
        let elStyle = {
            backgroundColor: el.color,
        }
        let clx = ['select-color-elements']
        if(color.id === el.id) {
            clx.push('color-now')
        }

        return (
            <div
                title="Выбрать цвет"
                className={clx.join(' ')}
                key={el.id}
                style={elStyle}
                onClick={() => changeColor(el.id)}>
            </div>
        )
    })
    return (
        <div className="select-colors">
            {elements}
        </div>
    )
}

export default SelectColors