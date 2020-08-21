import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import randomColor from 'randomcolor'

export default function Playground() {
  const [count, setCount] = useState(0)
  
  const inputRef = useRef()
  
  const [color, setColor] = useState(randomColor())
  useEffect(() =>
  { 
    inputRef.current.focus()
    
  }, [count])
  const cb = useCallback( num => console.log(num),[])
  useMemo(() => console.log("Use memo"),[])
  return (
    <div style={{ borderTop: `10px solid ${color}`}}>
      {count}
      <button onClick={() => setCount(currentCount => currentCount - 1)}>-</button>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>+</button>
      <button onClick={() => setColor(randomColor())}>Change Color</button>
      <hr />
      <input ref={inputRef} type="range" min={ 0 } max= { 100 } onChange={e => setCount(e.target.value)} value={count} />
    <Calculate cb = { cb } num = { count } />
    </div>	
  )
}

const Calculate = React.memo(({ cb,num }) => {
  cb(num);
  const renderCount = useRef(1)
  return <div>{renderCount.current++}</div>
})