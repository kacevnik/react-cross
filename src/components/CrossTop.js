import React, {useContext} from 'react';
import { Context } from '../context';

function CrossTop({ colors, top, size, style, contrast }) {

    const { changeColor } = useContext(Context);

    const Style = {
        width: style.width
    }

    const defaulColor = colors.length > 1 ? '#cecece' : 'transparent'

    const elements = top.data.map((row, indxRow) => {
        const styleRow = {
            width: size,
        }
        return (
            <div key={indxRow} className="cross-top-row" style={styleRow}>
                {
                    row.map((el, indx) => {
                        let clx = ['cross-top-elem']
                        if (top.line !== 0 && top.line !== indxRow + 1) {
                            clx.push('cross-top-elem-more')
                        }
                        let customColor = el.color ? colors.filter(c => c.id === el.color)[0].color : '#CACACA';
                        const styleElem = {
                            height: size,
                            width: size,
                            fontSize: size - 6,
                            lineHeight: size + 1 + 'px',
                            backgroundColor: el.count ? customColor : defaulColor,
                            color: contrast(customColor),
                            cursor: el.count ? 'pointer' : null
                        }
                        return (
                            <div key={indx} className={clx.join(' ')} style={styleElem} onClick={() => changeColor(el.color)}>
                                {el.count ? el.count : ''}
                            </div>
                        )
                    })
                }
            </div>
        )
    })

    return (
        <div className="cross-top" style={Style}>
            {elements}
        </div>
    )
}

export default CrossTop