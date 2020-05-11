import React from 'react'

function CrossTop({ top, size, style }) {
    const Style = {
        width: style.width
    }

    let key = 0;
    let keyRow = 0;

    const elements = top.map(row => {
        const styleRow = {
            width: size,
        }
        return (
            <div key={keyRow++} className="cross-top-row" style={styleRow}>
                {
                    row.map(el => {
                        const styleElem = {
                            height: size,
                            fontSize: size - 4,
                            lineHeight: size + 1 + 'px',
                            backgroundColor: el.count ? '#CACACA' : 'transparent',
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