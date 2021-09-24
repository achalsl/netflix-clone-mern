
import React, { useEffect, useState } from 'react'
import Featured from '../../components/Featured/Featured'
import Watchlist from '../../components/Watchlist/Watchlist'
import Navbar from '../../components/Navbar/Navbar'
import { axiosInstance } from '../../config'
import './Home.scss'

const Home = (props) => {
    const [watchlists, setWatchlists] = useState([])
    const [genre, setGenre] = useState(null)
    useEffect(() => {
        let mounted = true
        const getRandomWatchlists = async () => {
            try {
                if(mounted) {
                    const res = await axiosInstance.get(
                        `watchlists${props.type ? '?type=' + props.type : ""}${genre ? '&genre=' + genre : ""}`, 
                        {
                            headers: {
                                token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWY5OTAyMzg5MTMxMjJhM2Y5YzI1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMjQ3MjY0MiwiZXhwIjoxNjMyOTA0NjQyfQ.oRH5vI1B5Ees_0E-grh4s6B5AP4SdPas9jECFmbCQ0g'
                            }
                        }
                    )
                    console.log('watchlists: ', res.data)
                    setWatchlists(res.data)
                }
                
            } catch(err) {
                console.log(err)
            }
        }
        getRandomWatchlists()
        return () => {
            mounted = false
        }
    }, [props.type, genre])
    return (
        <div className="home">
            <Navbar />
            {/* <img 
            width="100%"
            src="https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1440&w=2560" 
            alt="" 
            /> */}
            <Featured type={props.type} setGenre={setGenre}/>
            {watchlists.map(watchlist => (
                <Watchlist watchlist={watchlist} key={watchlist.title}/>
            ))}
        </div>
    )
}

export default Home
