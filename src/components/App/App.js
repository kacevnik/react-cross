import React, { useState } from 'react';
import { Context } from '../../context';
import CrossArea from '../CrossArea';
import './App.css';

const Obj = {
  width: 10,
  height: 10,
  size: 18,
}

document.oncontextmenu = function (){return false};

function App() {

  function createArray (width, height){

    const arr = []
    for(let i = 0; i < height; i++){
      arr[i] = []
      for(let k = 0; k < width; k++){
        arr[i][k] = {key: (i+1) + '-' + (k+1), color: false, cross: false}
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
        if(el.key === key ){
          if(but === 0){
            el.color = !el.color ? color : false
            el.cross = false
            setButton([!el.color ? 'none' : 'color' , false])
          } else if ( but === 2) {
            el.cross = !el.cross
            el.color = false
            setButton([false, true])
          }
        }
        return el
      })
    }))
  }

  const mouseOverEvent = (key) => {
      if(button[0] || button[1]){
        setCross(cross.map(row => {
          return row.map(el => {
            if(el.key === key ){
              if(button[0]){
                if (button[0] === 'color') {
                  el.color = color
                } else {
                  el.color = false
                }
                el.cross = false
              } else if ( button[1]) {
                el.cross = !el.cross
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

  return (
    <Context.Provider value={{mouseDownEvent, mouseOverEvent, mouseUpEvent}}>
      <div className="App">
        <CrossArea width={Obj.width} height={Obj.height} size={size} cross={cross}/>
      </div>
    </Context.Provider>
  );
}

export default App;