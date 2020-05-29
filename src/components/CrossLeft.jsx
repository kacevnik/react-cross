import React from 'react'

function CrossLeft({left, size, colors, contrast}) {
    let key = 0
    let keyRow = 0
    const defaulColor = colors.length > 1 ? '#cecece' : 'transparent'
    const elements = left.data.map(row => {
        return(
            <div key={keyRow++} className="cross-left-row">
                {row.map(el => {
                    let clx = ['cross-left-elem']
                    if (left.line !== 0 && left.line !== keyRow) {
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
                    }
                    return(
                        <div key={key++} className={clx.join(' ')} style={styleElem}>{el.count ? el.count : ''}</div>
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