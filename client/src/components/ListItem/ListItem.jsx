import { Add, PlayArrow, ThumbDownOutlined, ThumbUpOutlined } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ListItem.scss'
const ListItem = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({})
    // const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
    
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get('/movies/'+props.item, {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWY5OTAyMzg5MTMxMjJhM2Y5YzI1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE5OTc0NCwiZXhwIjoxNjMxNjMxNzQ0fQ.9HSl_gT1Np_9JyMx-r-ifhqH-Q60oP90nC3eDsz0iZY'
                    }
                })
                setMovie(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getMovie()
    },[props.item])
    return (
        <Link to={{pathname: '/watch', movie: movie}}>
            <div className="itemWrapper">
                <div 
                    className="listItem" 
                    style={{'left': isHovered && (props.index <= 0 ? 0 : props.index * 230 - 50)}}
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

export default ListItem
