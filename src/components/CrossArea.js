import React, { useContext } from 'react';
import { Context } from '../context';
import SvgCross from './SvgCross'

function CrossArea({ size, cross, style }) {

    const { mouseDownEvent, mouseOverEvent, mouseUpEvent } = useContext(Context);

    let keyRow = 0;

    const elements = cross.map(row => {
        const styleRow = {
            height: size,
        }
        return (
            <div key={keyRow++} className="cross-row" style={styleRow}>
                {row.map(el => {
                    const styleElem = {
                        width: size,
                        backgroundColor: !el.color ? 'transparent' : el.color
                    }
                    return (
                        <div
                            onMouseDown={(event) => mouseDownEvent(event, el.key)}
                            onMouseOver={() => mouseOverEvent(el.key)}
                            onMouseUp={() => mouseUpEvent()}
                            key={el.key}
                            className="cross-elem"
                            style={styleElem}>
                            {el.cross ? <SvgCross /> : ''}
                        </div>
                    )
                })}
            </div>
        )
    })

    return (
        <div className="cross-area" style={style} onMouseLeave={() => mouseUpEvent()}>
            {elements}
        </div>
    );
}

export default CrossArea;