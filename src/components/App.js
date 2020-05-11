import React, { useState } from 'react';
import { Context } from '../context';
import CrossArea from './CrossArea';
import CrossTop from './CrossTop';
import CrossLeft from './CrossLeft';
import CrossLabel from './CrossLabel';
import './App.css';

const Obj = {
  width: 10,
  height: 10,
  size: 18,
  top: [
    [{ count: 0, color: null }, { count: 2, color: null }, { count: 2, color: null }, { count: 2, color: null }],
    [{ count: 1, color: null }, { count: 1, color: null }, { count: 1, color: null }, { count: 1, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 0, color: null }, { count: 3, color: null }],
    [{ count: 0, color: null }, { count: 1, color: null }, { count: 2, color: null }, { count: 1, color: null }],
    [{ count: 1, color: null }, { count: 1, color: null }, { count: 1, color: null }, { count: 1, color: null }],
    [{ count: 0, color: null }, { count: 2, color: null }, { count: 4, color: null }, { count: 1, color: null }],
    [{ count: 2, color: null }, { count: 1, color: null }, { count: 1, color: null }, { count: 1, color: null }],
    [{ count: 0, color: null }, { count: 2, color: null }, { count: 3, color: null }, { count: 2, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 5, color: null }, { count: 4, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 0, color: null }, { count: 10, color: null }],
  ],
  left: [
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 2, color: null }, { count: 7, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 1, color: null }, { count: 5, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 0, color: null }, { count: 2, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 0, color: null }, { count: 10, color: null }],
    [{ count: 1, color: null }, { count: 2, color: null }, { count: 1, color: null }, { count: 3, color: null }],
    [{ count: 0, color: null }, { count: 2, color: null }, { count: 3, color: null }, { count: 1, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 2, color: null }, { count: 2, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 0, color: null }, { count: 2, color: null }],
    [{ count: 0, color: null }, { count: 1, color: null }, { count: 3, color: null }, { count: 3, color: null }],
    [{ count: 0, color: null }, { count: 0, color: null }, { count: 2, color: null }, { count: 4, color: null }],
  ],
}

document.oncontextmenu = function () { return false };

function App() {

  function createArray(width, height) {

    const arr = []
    for (let i = 0; i < height; i++) {
      arr[i] = []
      for (let k = 0; k < width; k++) {
        arr[i][k] = { key: (i + 1) + '-' + (k + 1), color: false, cross: false }
      }
    }
    return arr
  }

  const [size, setSize] = useState(Obj.size);
  const [cross, setCross] = useState(createArray(Obj.width, Obj.height));
  const [color, setColor] = useState('#000000')
  const [button, setButton] = useState([false, false])

  const mouseDownEvent = (event, key) => {

    const but = event.button
    setCross(cross.map(row => {
      return row.map(el => {
        if (el.key === key) {
          if (but === 0) {
            el.color = !el.color ? color : false
            el.cross = false
            setButton([!el.color ? 'none' : 'color', false])
          } else if (but === 2) {
            el.cross = !el.cross
            el.color = false
            setButton([false, !el.cross ? 'none' : 'cross'])
          }
        }
        return el
      })
    }))
  }

  const mouseOverEvent = (key) => {
    if (button[0] || button[1]) {
      setCross(cross.map(row => {
        return row.map(el => {
          if (el.key === key) {
            if (button[0]) {
              if (button[0] === 'color') {
                el.color = color
              } else {
                el.color = false
              }
              el.cross = false
            } else if (button[1]) {
              if (button[1] === 'cross') {
                el.cross = true
              } else {
                el.cross = false
              }
              el.color = false
            }
          }
          return el
        })
      }))
    }
  }

  const mouseUpEvent = () => {
    setButton([false, false])
  }

  const style = {
    width: Obj.width * size + Obj.width - 1 + Math.ceil(Obj.width / 5) - 1,
    height: Obj.height * size + Obj.height - 1 + Math.ceil(Obj.height / 5) - 1,
  }

  return (
    <Context.Provider value={{ mouseDownEvent, mouseOverEvent, mouseUpEvent }}>
      <div className="App">
        <div className="cross-row-1">
          <CrossLabel size={size} left={Obj.left[0].length} />
          <CrossTop top={Obj.top} size={size} style={style} />
        </div>

        <div className="cross-row-1">
          <CrossLeft left={Obj.left} size={size}/>
          <CrossArea size={size} cross={cross} style={style} />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;