import React, {useContext} from 'react';
import { Context } from '../context';

function CrossLeft({left, size, colors, contrast}) {

    const { changeColor } = useContext(Context);

    const defaulColor = colors.length > 1 ? '#cecece' : 'transparent'
    const elements = left.data.map((row, indRow) => {
        return(
            <div key={indRow} className="cross-left-row">
                {row.map((el, indx) => {
                    let clx = ['cross-left-elem']
                    if (left.line !== 0 && left.line !== indRow + 1) {
                        clx.push('cross-left-elem-more')
                    }

                    let customColor = el.color ? colors.filter(c => c.id === el.color)[0].color : '#CACACA';
                    let styleElem = {
                        width: size,
                        height: size,
                        fontSize: size -6,
                        lineHeight: size + 1 + 'px',
                        backgroundColor: el.count ? customColor : defaulColor,
                        color: contrast(customColor),
                        cursor: el.count ? 'pointer' : null
                    }
                    return(
                        <div key={indx++} className={clx.join(' ')} onClick={() => changeColor(el.color)} style={styleElem}>{el.count ? el.count : ''}</div>
                    )
                })}
            </div>
        )
    })
    return(
        <div className="cross-left">
            {elements}
        </div>
    )
}

export default CrossLeft