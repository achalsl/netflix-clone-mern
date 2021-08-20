import { Add, PlayArrow, ThumbDownOutlined, ThumbUpOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import './ListItem.scss'
const ListItem = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
    const imgSrc = props.imgSrc
    return (
        <div 
            className="listItem" 
            style={{'left': isHovered && props.index * 225 - 50 + props.index * 5}}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            {!!imgSrc ? (<img 
                src={imgSrc} 
                alt=""
            />) : (<img 
                src="https://occ-0-3216-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABe5TsVeChnFnPGTyfBRKXzF4YowytWK4YaIoCBmpipi2WCVYnMnD0_Crw7JJ1iM_rBn_JBCRHC3Xi-iseavu-Uk68Pd-Guih7CCwBRfjW9al84fCcuLzgc9Hk-wB.jpg?r=d81" 
                alt=""
            />)}
            {/* <img 
                src="https://occ-0-3216-2164.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABe5TsVeChnFnPGTyfBRKXzF4YowytWK4YaIoCBmpipi2WCVYnMnD0_Crw7JJ1iM_rBn_JBCRHC3Xi-iseavu-Uk68Pd-Guih7CCwBRfjW9al84fCcuLzgc9Hk-wB.jpg?r=d81" 
                alt="https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            /> */}
            {isHovered && (
                <>
                    <video src={trailer} autoPlay={true} loop/>
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>1 hour 45 mins</span>
                            <span className="contentRating">+16</span>
                            <span>2020</span>
                        </div>
                        <div className="desc">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, eius corrupti.
                        </div>
                        <div className="genre">Action</div>
                    </div>
                </>
            )}
            
            
        </div>
    )
}

export default ListItem
