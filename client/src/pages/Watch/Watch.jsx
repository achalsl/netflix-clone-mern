import { ArrowBackOutlined } from '@material-ui/icons'
import React from 'react'
import './Watch.scss'

const Watch = () => {
    return (
        <div className="watch">
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <video className="video" 
                    autoPlay
                    progress 
                    controls 
                    src="https://vod-progressive.akamaized.net/exp=1629060082~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1649%2F15%2F383246700%2F1609600505.mp4~hmac=ef1d6737edcfd3026be6e14c0bf7c7c0d9f3039fd5e4fa2c4f64ae519c41c224/vimeo-prod-skyfire-std-us/01/1649/15/383246700/1609600505.mp4" />
        </div>
    )
}

export default Watch
