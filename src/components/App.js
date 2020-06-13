import React, { useState } from 'react';
import md5 from 'md5'
import { Context } from '../context';
import CrossArea from './CrossArea';
import CrossTop from './CrossTop';
import CrossLeft from './CrossLeft';
import CrossLabel from './CrossLabel';
import SelectColors from './SelectColors';
import NonoButtons from './NonoButtons';
import './App.css';

document.oncontextmenu = function () { return false };

function App() {

  const $ = window.jQuery
  const Obj = window.Obj.data

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

  function getString(arr){
    var count = 0
    let dataArr
    let str = ''
    let result = ''
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if ( arr[i][j].color ) {
          str += Obj.colors.filter(el => el.color === arr[i][j].color )[0].id
        } else {
          if ( arr[i][j].cross) {
            str += '9'
          } else {
            str += '0'
          }
        }

      }
    }

    dataArr = str.split('');
    for ( let k = 0; k < dataArr.length; k++) {
      count++
      if(dataArr[k] !== dataArr[k + 1]) {
        let sep = result ? ',' : ''
        result += sep + dataArr[k] + ':' + count
        count = 0
      }
    }
    return result
  }

  function getArrFromString(string) {
    let str = ''
    const arr = string.split(',')
    for (let i = 0; i < arr.length; i++){
      let item = arr[i].split(':')
      for (let k = 0; k < item[1]; k++){
        str += item[0]
      }
    }
    const strArr = str.split('')
    const res = []

    for (let i = 0; i < Obj.height; i++) {
      res[i] = []
      for (let k = 0; k < Obj.width; k++) {
        let color = false
        let cross = false

        if(strArr[Obj.width * i + k] !== '0') {
          if(strArr[Obj.width * i + k] === '9') {
            cross = true
          } else {
            color = Obj.colors.filter(el => el.id === strArr[Obj.width * i + k] * 1)[0].color
            cross = false
          }
        }
        res[i][k] = { key: (i + 1) + '-' + (k + 1), color: color, cross: cross }
      }
    }

    return res;
  }

  function getHistory(){
    if(Obj.history.length > 0){
      return Obj.history
    } else {
      const his = JSON.parse(localStorage.getItem('nonograms_' + Obj.id))
      if(his.length > 1) {
        return his
      }
      return [getString(createArray(Obj.width, Obj.height))]
    }
  }

  const [size, setSize] = useState(Obj.size);
  const [color, setColor] = useState(Obj.colors[0])
  const [button, setButton] = useState([false, false])
  const [top, setTop] = useState({data:Obj.top, line: 0})
  const [left, setLeft] = useState({data:Obj.left, line: 0})
  const [history, setHistory] = useState(getHistory())
  const [cross, setCross] = useState(getArrFromString(history[history.length - 1]));
  const [save, setSave] = useState(false)

  const mouseDownEvent = (event, key) => {

  const but = event.button
    setCross(cross.map(row => {
      return row.map(el => {
        if (el.key === key) {
          if (but === 0) {
            if (!el.color ) {
              el.color = color.color
            } else {
              el.color = el.color !== color.color ? color.color : false
            }
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
    checkAns();
  }

  const mouseOverEvent = (key) => {
    if (button[0] || button[1]) {
      setCross(cross.map(row => {
        return row.map(el => {
          if (el.key === key) {
            if (button[0]) {
              if (button[0] === 'color') {
                el.color = color.color
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
      checkAns();
    }
    showHintLines(key);
  }

  const showHintLines = (key) => {
    const cors = key.split('-')
    setTop({data: top.data, line: cors[1] * 1})
    setLeft({data: left.data, line: cors[0] * 1})
  }

  const checkAns = () => {
    let string = '';
    for (let i = 0; i < Obj.height; i++) {
      for (let k = 0; k < Obj.width; k++) {
        if (cross[i][k].color === false) {
          string += '0';
        } else {
          let id = Obj.colors.filter(el => el.color === cross[i][k].color)
          string += (id[0].id + '');
        }
      }
    }

    if (md5(string) === Obj.ans) console.log('Кроссворд решен');

  }

  const changeColor = (id) => {
    setColor(Obj.colors.filter(el => el.id === id)[0])
  }

  const mouseUpEvent = () => {
    setHistory([...history, getString(cross)])
    setButton([false, false])
    setSave(false)
  }

  const mouseLeaveEvent = () => {
    if(button[0] || button[1]){
      setHistory([...history, getString(cross)])
      setSave(false)
    }
    setButton([false, false])

    setTop({data: top.data, line: 0})
    setLeft({data: left.data, line: 0})
  }

  const style = {
    width: Obj.width * size + Obj.width - 1 + Math.ceil(Obj.width / 5) - 1,
    height: Obj.height * size + Obj.height - 1 + Math.ceil(Obj.height / 5) - 1,
  }

  const getCorrectTextColor = hex => {
  
    let threshold = 130;
    
    let hRed = hexToR(hex);
    let hGreen = hexToG(hex);
    let hBlue = hexToB(hex);
    
    
    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)==="#") ? h.substring(1,7):h}
  
    const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
      if (cBrightness > threshold){return "#000000";} else { return "#ffffff";}	
  }

  const onSize = (event) => {
    let newSize = size;
    if(event === 'minus' && size > 14) {
      newSize = size - 2;
      setSize(newSize)
    }
    if(event === 'plus' && size < 28) {
      newSize = size + 2;
      setSize(newSize)
    }
  }

  const onClearCross = () => {
    if(history.length > 1) {
      setHistory([...history, getString(createArray(Obj.width, Obj.height))])
      setCross(createArray(Obj.width, Obj.height))
      setSave(false)
    }
  }

  const stepBackHistory = () => {
    const his = history
    if (history.length > 1 ) {
      his.pop()
      setHistory(his)
      setCross(getArrFromString(his[his.length - 1]))
    }
  }

  const saveCross = () => {
    localStorage.setItem('nonograms_' + Obj.id, JSON.stringify(history))
    setSave(true)
  }

  return (
    <Context.Provider value={{ mouseDownEvent, mouseOverEvent, mouseUpEvent, changeColor, mouseLeaveEvent, onSize, onClearCross, stepBackHistory, saveCross }}>
      <div className="App">
        <NonoButtons size={size} history={history} save={save} />
        {Obj.colors.length > 1 ? (<SelectColors colors={Obj.colors} color={color}/>) : ''}
        <div className="cross-row-1">
          <CrossLabel size={size} left={Obj.left[0].length} />
          <CrossTop top={top} size={size} style={style} colors={Obj.colors} contrast={getCorrectTextColor} />
        </div>

        <div className="cross-row-1">
          <CrossLeft left={left} size={size} colors={Obj.colors} contrast={getCorrectTextColor} />
          <CrossArea size={size} cross={cross} style={style} />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;