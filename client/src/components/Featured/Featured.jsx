import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React from 'react'
import './Featured.scss'
const Featured = (props) => {
    return (
        <div className="featured">
            {props.type && (
                <div className="category">
                    <span>{props.type === 'movie' ? 'Movies' : 'Series'}</span>
                    <select name="genre" id="genre">
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>

                    </select>
                </div>
            )}
            <img 
            width="100%"  
            src="https://images.pexels.com/photos/922807/pexels-photo-922807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
            alt="" 
            />
            <div className="info">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Spider-Man_ITSV.png" 
                alt="" 
                />
                <span className="desc">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe rerum consectetur reiciendis voluptatum autem dolorem quidem sequi impedit.
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow/>
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined/>
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
