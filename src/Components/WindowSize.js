import React,{ useState,useEffect } from 'react'

export default function WindowSize(cb) {
    const [[windowHeight,windowWidth], setWindowSize] = useState([
        window.innerHeight,
        window.innerWidth
    ]); 

    
    useEffect(() => {
        const handleResize = () => {
            cb()
            setWindowSize([
                window.innerHeight, window.innerWidth
            ])
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize",handleResize);
    }, [])
    return [windowWidth,windowHeight] 
}