import { ArrowBackOutlined } from '@material-ui/icons'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Watch.scss'

const Watch = () => {
    const location = useLocation();
    console.log(location)
    const movie = location.movie
    return (
        <div className="watch">
            <div className="back">
                <Link to='/' className='link'>
                    <ArrowBackOutlined />
                </Link>
                <span className='homeButton'>Home</span>
            </div>
            <video className="video" 
                    autoPlay
                    progress 
                    controls 
                    src={movie.video} />
        </div>
    )
}

export default Watch
