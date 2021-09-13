
import React, { useEffect, useState } from 'react'
import Featured from '../../components/Featured/Featured'
import List from '../../components/List/List'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import './Home.scss'

const Home = (props) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)
    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${props.type ? '?type=' + props.type : ""}${genre ? '&genre=' + genre : ""}`, 
                    {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMWY5OTAyMzg5MTMxMjJhM2Y5YzI1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE5OTc0NCwiZXhwIjoxNjMxNjMxNzQ0fQ.9HSl_gT1Np_9JyMx-r-ifhqH-Q60oP90nC3eDsz0iZY'
                        }
                    }
                )
                console.log('lists: ', res.data)
                setLists(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        getRandomLists()
    }, [props.type, genre])
    return (
        <div className="home">
            <Navbar />
            {/* <img 
            width="100%"
            src="https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1440&w=2560" 
            alt="" 
            /> */}
            <Featured type={props.type} />
            {lists.map(list => (
                <List list={list} key={list.title}/>
            ))}
        </div>
    )
}

export default Home
