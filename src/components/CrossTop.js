import React from 'react'

function CrossTop({ colors, top, size, style, contrast }) {
    const Style = {
        width: style.width
    }

    let key = 0;
    let keyRow = 0;
    const defaulColor = colors.length > 1 ? '#cecece' : 'transparent'

    const elements = top.data.map(row => {
        const styleRow = {
            width: size,
        }
        return (
            <div key={keyRow++} className="cross-top-row" style={styleRow}>
                {
                    row.map(el => {
                        let clx = ['cross-top-elem']
                        if (top.line !== 0 && top.line !== keyRow) {
                            clx.push('cross-top-elem-more')
                        }
                        let customColor = el.color ? colors.filter(c => c.id === el.color)[0].color : '#CACACA';
                        const styleElem = {
                            height: size,
                            fontSize: size - 6,
                            lineHeight: size + 1 + 'px',
                            backgroundColor: el.count ? customColor : defaulColor,
                            color: contrast(customColor),
                        }
                        return (
                            <div key={key++} className={clx.join(' ')} style={styleElem}>
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