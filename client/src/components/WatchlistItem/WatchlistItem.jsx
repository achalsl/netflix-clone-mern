import { Add, PlayArrow, ThumbDownOutlined, ThumbUpOutlined } from '@material-ui/icons'
import { axiosInstance } from '../../config'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './WatchlistItem.scss'
const WatchlistItem = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({})
    // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
    
    useEffect(() => {
        let mounted = true
        const getMovie = async () => {
            if(mounted) {
                try {
                    const res = await axiosInstance.get('/movies/'+props.item, {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWY5OTAyMzg5MTMxMjJhM2Y5YzI1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMjE2MzQ4NCwiZXhwIjoxNjMyNTk1NDg0fQ.rhCAnIRUBKqS9tVvOQNe3ksj6zB4aOaLrnVaX2S3mVI'
                        }
                    })
                    setMovie(res.data)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        getMovie()
        return () => {
            mounted = false
        }
    },[props.item])
    return (
        <Link to={{pathname: '/watch', movie: movie}}>
            <div className="itemWrapper">
                <div 
                    className="watchlistItem" 
                    style={{'left': isHovered && (props.index === props.slideNumber ? props.index * 230 : props.index * 230 - 50)}}
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)}
                    >
                    <img 
                        src={movie.img}
                        alt=""
                        />
                    {isHovered && (
                        <>
                            <video src={movie.trailer} autoPlay={true} loop/>
                            <div className="itemInfo">
                                <div className="icons">
                                    <PlayArrow className="icon" />
                                    <Add className="icon" />
                                    <ThumbUpOutlined className="icon" />
                                    <ThumbDownOutlined className="icon" />
                                </div>
                                <div className="itemInfoTop">
                                    <span>{movie.duration}</span>
                                    <span className="contentRating">{movie.ageLimit}</span>
                                    <span>{movie.releaseYear}</span>
                                </div>
                                <div className="desc">
                                    {movie.desc}
                                </div>
                                <div className="genre">{movie.genre}</div>
                            </div>
                        </>
                    )}
                    
                    
                </div>
            </div>
        </Link>
    )
}

export default WatchlistItem
