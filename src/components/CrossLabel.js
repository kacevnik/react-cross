import React from 'react'

function CrossLabel({size, left}){
    const style = {
        width: size * left + left - 1,
    }
    return <div className="cross-label" style={style}></div>
}

export default CrossLabel