import { ArrowBackOutlined } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './Watch.scss'

const Watch = () => {
    const location = useLocation();
    const history = useHistory()
    console.log(location)
    const movie = JSON.parse(localStorage.getItem('movie')) || location.movie

    useEffect(() => {
        localStorage.setItem('movie', JSON.stringify(movie))
    }, [])

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
