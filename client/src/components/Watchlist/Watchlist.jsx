import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import WatchlistItem from '../WatchlistItem/WatchlistItem'
import './Watchlist.scss'
const Watchlist = (props) => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [isMoved, setIsMoved] = useState(false)
    const [isEnded, setIsEnded] = useState(false)

    const watchlistRef = useRef()
    let listLength = props.watchlist.content.length

    const handleClick = (direction) => {
        setIsMoved(true)
        let distance = watchlistRef.current.getBoundingClientRect().x - 50
        
        if(direction === "left" && slideNumber > 0) {
            setIsEnded(false)
            if(slideNumber - 5 <= 0) {
                watchlistRef.current.style.transform = `translateX(${slideNumber * 230 + distance}px)`
                setSlideNumber(0)
            }
            if(slideNumber - 5 > 0) {
                watchlistRef.current.style.transform = `translateX(${1150 + distance}px)`
                setSlideNumber(slideNumber - 5)
            }
            
            
        }
        if(direction === "right" && slideNumber < listLength) {
            if(slideNumber <= listLength - 10) {
                if(slideNumber === listLength - 10) {
                    setIsEnded(true)
                }
                setSlideNumber(slideNumber + 5)
                watchlistRef.current.style.transform = `translateX(${-1150 + distance}px)`
            } else {
                if(slideNumber < listLength - 5) {
                    watchlistRef.current.style.transform = `translateX(${(slideNumber - listLength + 5)*230 + distance}px)`
                    setSlideNumber(listLength - 5)
                    setIsEnded(true)
                }
            }
        }
    }
    console.log('slideNumber', slideNumber, 'watchlistLength', listLength)
    return (
        <div className="watchlist">
            <span className="watchlistTitle">{props.watchlist.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left" 
                    onClick={() => handleClick('left')}
                    style={{display: !isMoved && 'none'}}
                />
                <div className="container" ref={watchlistRef}>
                    {props.watchlist.content.map((item, index) => (
                        <WatchlistItem index={index} item={item} key={index} slideNumber={slideNumber} listLength={listLength}/>
                    ))}
                </div>
                <ArrowForwardIosOutlined 
                    className="sliderArrow right" 
                    onClick={() => handleClick('right')} 
                    style={{display: isEnded && 'none'}}
                />
            </div>
        </div>
    )
}

export default Watchlist
