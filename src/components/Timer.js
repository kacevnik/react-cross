import React, { useState } from 'react'

function Timer({timer}){
    const [show, setShow] = useState(true)
    const stepsTimer = () => {
        let str = ''
        let hr  = Math.floor(timer/(60*60))
        str += hr < 10 ? '0' + hr + ':' : hr + ':'
        let min = Math.floor(timer/60)%60
        str += min < 10 ? '0' + min + ':' : min + ':'
        let sec = timer%60
        str += sec < 10 ? '0' + sec : sec
        return str
    }

    const clx = ['nono-timer']
    if(!show){
        clx.push('hide')
    }

    let eae = show ? 'icon-eye-blocked' : 'icon-eye'

    const title = show ? 'Скрыть таймер' : 'Показать таймер'
    return(
        <div className={clx.join(' ')}>
            <span title={title} onClick={() => setShow(!show)}>{stepsTimer()}<i className={eae}></i></span>
        </div>
    )
}

export default Timer