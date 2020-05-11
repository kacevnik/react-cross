import React from 'react'

function CrossLeft({left, size}) {
    let key = 0
    let keyRow = 0
    const elements = left.map(row => {
        return(
            <div key={keyRow++} className="cross-left-row">
                {row.map(el => {
                    let styleElem = {
                        width: size,
                        height: size,
                        fontSize: size -4,
                        lineHeight: size + 1 + 'px',
                        backgroundColor: el.count ? '#CACACA' : 'transparent',
                    }
                    return(
                        <div key={key++} className="cross-left-elem" style={styleElem}>{el.count ? el.count : ''}</div>
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