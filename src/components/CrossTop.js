import React from 'react'

function CrossTop({ colors, top, size, style, contrast }) {
    const Style = {
        width: style.width
    }

    let key = 0;
    let keyRow = 0;
    const defaulColor = colors.length > 1 ? '#cecece' : 'transparent'

    const elements = top.map(row => {
        const styleRow = {
            width: size,
        }
        return (
            <div key={keyRow++} className="cross-top-row" style={styleRow}>
                {
                    row.map(el => {
                        let customColor = el.color ? colors.filter(c => c.id === el.color)[0].color : '#CACACA';
                        const styleElem = {
                            height: size,
                            fontSize: size - 6,
                            lineHeight: size + 1 + 'px',
                            backgroundColor: el.count ? customColor : defaulColor,
                            color: contrast(customColor)
                        }
                        return (
                            <div key={key++} className="cross-top-elem" style={styleElem}>
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