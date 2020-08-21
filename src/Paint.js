import React, { useState,useEffect,useRef,useCallback } from 'react'
import randomColor from 'randomcolor';
import ColorPicker from './Components/ColorPicker';
import Name from './Components/Name';
import WindowSize from './Components/WindowSize';
import Canvas from './Components/Canvas';
import Playground from './Components/Playground';
import RefreshButton from './Components/RefreshButton'
import  useWindowSize from './Components/WindowSize';

export default function GetColors (){
    const [ activeColor,setActiveColor ] = useState(null);
    const [ colors, setColors ] = useState([])
    const headerRef = useRef();
    const [ visible, setVisible ] = useState(false);
    const getColor = useCallback(
        () => {

            const baseColor = randomColor().slice(1);
            fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
                .then((res) => res.json())
                .then((res) => {
                    console.log("set color")
                    setColors(res.colors.map((color) => color.hex.value));
                    setActiveColor(res.colors[0].hex.value);
                });
        },
        []
    )
    let timeoutId = useRef();
    const [windowWidth,windowHeight] = useWindowSize(() =>  {
        setVisible(true)
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => setVisible(false), 500)
      });
    useEffect(getColor,[])

    return(
        <div className="app">
            <header ref={ headerRef } style={{ borderTop: `10px solid ${activeColor}` }}>
                <div>
                    <Name />
                </div>
                <div style={{ marginTop: 10 }}>
                    <ColorPicker
                    colors={colors}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                    />
                    <RefreshButton  cb = { getColor } />
                </div>   
            </header>
            {activeColor && (
        <Canvas
          color={activeColor}
          height={window.innerHeight}
          width = { window.innerWidth }
        />
      )}
        <div className={`window-size ${visible ? '' : 'hidden'}`}>
            {windowWidth} x {windowHeight}
        </div>
      </div>
      )
};
