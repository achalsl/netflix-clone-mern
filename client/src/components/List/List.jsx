import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import ListItem from '../ListItem/ListItem'
import './List.scss'
const List = (props) => {
    const [slideNumber, setSlideNumber] = useState(0)
    const [isMoved, setIsMoved] = useState(false)

    const listRef = useRef()
    const handleClick = (direction) => {
        setIsMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50
        if(direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 5)
            listRef.current.style.transform = `translateX(${1150 + distance}px)`
        }
        if(direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 5)
            listRef.current.style.transform = `translateX(${-1150 + distance}px)`
        }
    }
    return (
        <div className="list">
            <span className="listTitle">{props.list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left" 
                    onClick={() => handleClick('left')}
                    style={{display: !isMoved && 'none'}}
                />
                <div className="container" ref={listRef}>
                    {props.list.content.map((item, index) => (
                        <ListItem index={index} item={item} key={index} />
                    ))}
                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={() => handleClick('right')} />
            </div>
        </div>
    )
}

export default List
