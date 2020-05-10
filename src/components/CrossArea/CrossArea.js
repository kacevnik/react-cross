import React, {useContext} from 'react';
import { Context } from '../../context';
import SvgCross from '../SvgCross'

function CrossArea({width, height, size, cross}) {

    const { mouseDownEvent, mouseOverEvent, mouseUpEvent } = useContext(Context);

    const Style = {
        width: width * size + width - 1 + Math.ceil(width / 5) - 1,
        height: height * size + height - 1 + Math.ceil(height / 5) - 1,
    }

    let keyRow = 0;

    const elements = cross.map(row => {
        const styleRow = {
            height: size,
        }
        return (
            <div key={keyRow++} className="cross-row" style={styleRow}>
                {row.map(el =>{
                    const styleElem = {
                        width: size,
                        backgroundColor: !el.color ? 'transparent' : el.color
                    }
                    return(
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
        <div className="cross-area" style={Style}>
            {elements}
        </div>
    );
}

export default CrossArea;